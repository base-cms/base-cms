const { AuthenticationError } = require('apollo-server-express');
const UserContext = require('./context');

module.exports = async ({ req, userService }) => {
  const authorization = req.get('authorization');
  if (!authorization) return new UserContext();

  if (!/^Bearer /.test(authorization)) throw new AuthenticationError('The provided credentials are invalid.');
  const { token } = authorization.match(/^Bearer (?<token>.+)/).groups;
  const user = await userService.checkAuth(token);
  return new UserContext({ user, token });
};
