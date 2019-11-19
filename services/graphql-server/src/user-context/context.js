const { getAsArray } = require('@base-cms/object-path');

module.exports = class UserContext {
  constructor(service, user) {
    this.service = service;
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    return this.user && this.user._id;
  }

  hasRole(role) {
    const roles = getAsArray(this, 'user.roles');
    return roles.includes(role);
  }

  /**
   * @return UserAuthToken
   * @param {*} username The username
   * @param {*} password The password
   */
  async login(username, password) {
    const { user, token } = await this.service.login(username, password);
    this.user = user;
    return token;
  }

  logout() {
    return this.service.logout();
  }
};
