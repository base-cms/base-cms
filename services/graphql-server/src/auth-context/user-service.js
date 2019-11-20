const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');

class UserService {
  setDb(basedb) {
    this.basedb = basedb;
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
    if (!user) throw new AuthenticationError('Invalid credentials');
    const hash = user.password.replace(/^\$2y\$/, '$2a$');
    const valid = await bcrypt.compare(plaintext, hash);
    if (!valid) throw new AuthenticationError('Invalid credentials');
    return tokenService.create(user);
  }

  // eslint-disable-next-line class-methods-use-this
  logout(token) {
    tokenService.destroy(token);
    return 'ok';
  }

  async retrieve(token) {
    const { uid: _id } = await tokenService.validate(token);
    return this.basedb.findOne('platform.User', { _id });
  }
}

module.exports = new UserService();
