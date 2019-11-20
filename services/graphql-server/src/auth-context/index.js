const token = require('./token-service');
const user = require('./user-service');
const create = require('./create');

module.exports = (basedb) => {
  token.setDb(basedb);
  user.setDb(basedb);
  return { token, user, create };
};
