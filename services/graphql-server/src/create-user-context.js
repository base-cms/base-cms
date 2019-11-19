const { getAsArray } = require('@base-cms/object-path');
const { AuthenticationError } = require('apollo-server-express');

// @todo create token service to look up bearer token
const retrieve = (email, { basedb }) => basedb.findOne('platform.User', { email });

class UserContext {
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
}

module.exports = async ({ req, basedb }) => {
  const authorization = req.get('authorization');

  if (authorization) {
    if (!/^Bearer /.test(authorization)) throw new AuthenticationError('Invalid authorization header');
    const { token } = authorization.match(/^Bearer (?<token>.+)/).groups;
    const user = await retrieve(token, { basedb });
    return new UserContext(user);
  }

  return new UserContext();
};
