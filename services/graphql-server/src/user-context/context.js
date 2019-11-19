const { getAsArray } = require('@base-cms/object-path');

module.exports = class UserContext {
  constructor(user) {
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
};
