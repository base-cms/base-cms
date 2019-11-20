const TokenService = require('./token-service');
const UserService = require('./user-service');

module.exports = ({ basedb }) => {
  const tokenService = new TokenService({ basedb });
  const userService = new UserService({ basedb, tokenService });
  return userService;
};
