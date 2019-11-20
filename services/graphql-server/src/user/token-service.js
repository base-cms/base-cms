const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');
const bcrypt = require('bcrypt');
const { TOKEN_SECRET, TOKEN_NAMESPACE } = require('../env');

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
    const { insertedId } = await this.basedb.insertOne('platform.AuthToken', payload);
    return {
      id: insertedId,
      expires: new Date(exp),
      value: token,
    };
  }

  destroy(token) {
    return this.basedb.deleteOne('platform.AuthToken', { token });
  }

  async validate(token) {
    if (!token) throw new AuthenticationError('No token presented');
    const parsed = await jwt.decode(token, { complete: true, force: true });
    if (!parsed) throw new AuthenticationError('Invalid token');
    const authToken = await this.basedb.findOne('platform.AuthToken', { token }, { projection: { sid: 1, secret: 1, uid: 1 } });
    if (!authToken) throw new AuthenticationError('Token does not exist');
    const { uid, sid, secret } = authToken;
    const verified = jwt.verify(token, secret, { jwtid: sid, algorithms: ['HS256'] });
    if (!verified) throw new AuthenticationError('Invalid token');
    return { token, uid };
  }
}

module.exports = TokenService;
