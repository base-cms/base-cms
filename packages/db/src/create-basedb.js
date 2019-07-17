const { inspect } = require('util');
const BaseDB = require('./basedb');

const { NODE_ENV, ENABLE_BASEDB_LOGGING } = process.env;
const { log } = console;

const logger = (obj) => {
  log('');
  Object.keys(obj).forEach(key => log(`${key}:`, inspect(obj[key], { colors: true, depth: 5 })));
  log('');
};

const shouldLog = () => {
  if (NODE_ENV !== 'development') return false;
  return ENABLE_BASEDB_LOGGING;
};

module.exports = ({ tenant, client }) => new BaseDB({
  tenant,
  client,
  logger: shouldLog() ? logger : undefined,
});
