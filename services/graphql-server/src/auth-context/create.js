const { AuthenticationError } = require('apollo-server-express');
const UserContext = require('./context');

const expression = new RegExp(/^Bearer (?<token>.+)/);

module.exports = async ({ req, userService }) => {
  const authorization = req.get('authorization');
  if (!authorization) return new UserContext();

  if (!expression.test(authorization)) throw new AuthenticationError('The provided credentials are invalid.');
  const { token } = authorization.match(expression).groups;
  const user = await userService.checkAuth(token);
  return new UserContext({ user, token });
};
