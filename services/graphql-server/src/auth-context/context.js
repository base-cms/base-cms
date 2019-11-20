const { getAsArray } = require('@base-cms/object-path');

module.exports = class UserContext {
  constructor({ user, token } = {}) {
    this.user = user;
    this.token = token;
  }

  getUser() {
    return this.user;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return this.user && this.user._id;
  }

  hasRole(role) {
    const roles = getAsArray(this, 'user.roles');
    return roles.includes(role);
  }
};
