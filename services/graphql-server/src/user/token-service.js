const { AuthenticationError } = require('apollo-server-express');

const { log } = console;
const testToken = { id: '1234567890', value: 'ac4bd32343fgh123' };

class TokenService {
  constructor({ basedb }) {
    this.basedb = basedb;
  }

  // eslint-disable-next-line class-methods-use-this
  create(user) {
    // create token for user
    log({ user });
    const token = testToken;
    return token;
    // const inserted = this.basedb.insertOne('platform.AuthToken', token);
    // return {
    //   ...token,
    //   ...inserted,
    // };
  }

  destroy(value) {
    return this.basedb.deleteOne('platform.AuthToken', { value });
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(token) {
    log('validate', { token });
    throw new AuthenticationError('Invalid token');
  }
}

module.exports = TokenService;
