const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');
const bcrypt = require('bcrypt');
const { TOKEN_SECRET, TOKEN_NAMESPACE } = require('../env');

const { log } = console;

class TokenService {
  constructor({ basedb }) {
    this.basedb = basedb;
  }

  async create(uid) {
    if (!uid) throw new Error('The user ID is required.');

    const now = new Date();
    const iat = Math.floor(now.valueOf() / 1000);

    const userSecret = await bcrypt.hash(uuidv4(), 5);
    const secret = `${userSecret}.${TOKEN_SECRET}`;

    const sid = uuidv5(`${uid}.${now.valueOf()}`, TOKEN_NAMESPACE);
    const exp = iat + Number(86400 * 30);
    const token = jwt.sign({ jti: sid, exp, iat }, secret);

    const payload = {
      token,
      exp: new Date(exp * 1000),
      uid,
      sid,
      secret,
    };
    await this.basedb.insertOne('platform.AuthToken', payload);
    return payload;
  }

  destroy(token) {
    return this.basedb.deleteOne('platform.AuthToken', { token });
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(token) {
    log('validate', { token });
    throw new AuthenticationError('Invalid token');
  }
}

module.exports = TokenService;
