const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const TokenService = require('./token-service');

const UserService = class UserService {
  constructor({ basedb }) {
    this.basedb = basedb;
    this.tokenService = new TokenService({ basedb });
  }

  async login(username, plaintext) {
    const criteria = {
      username,
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
      enabled: true,
    };
    const user = await this.basedb.findOne('platform.User', criteria);
    if (!user) throw new AuthenticationError('The provided user credentials are invalid.');
    const hash = user.password.replace(/^\$2y\$/, '$2a$');
    const valid = await bcrypt.compare(plaintext, hash);
    if (!valid) throw new AuthenticationError('The provided user credentials are invalid.');
    return this.tokenService.create(user._id);
  }

  // eslint-disable-next-line class-methods-use-this
  async logout(token) {
    await this.tokenService.destroy(token);
    return 'ok';
  }

  async checkAuth(token) {
    const { uid } = await this.tokenService.validate(token);
    return this.basedb.findOne('platform.User', { _id: uid });
  }
};

module.exports = UserService;
