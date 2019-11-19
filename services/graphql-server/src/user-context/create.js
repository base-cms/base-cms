const { AuthenticationError } = require('apollo-server-express');
const service = require('./service');
const UserContext = require('./context');

module.exports = async ({ req }) => {
  const authorization = req.get('authorization');

  if (authorization) {
    if (!/^Bearer /.test(authorization)) throw new AuthenticationError('Invalid authorization header');
    const { token } = authorization.match(/^Bearer (?<token>.+)/).groups;
    const user = await service.retrieve(token);
    return new UserContext(service, user);
  }

  return new UserContext(service);
};
