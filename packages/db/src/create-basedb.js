const { inspect } = require('util');
const BaseDB = require('./basedb');

const { NODE_ENV, ENABLE_BASEDB_LOGGING } = process.env;
const { log } = console;

const logger = (obj) => {
  log('');
  Object.keys(obj).forEach(key => log(`${key}:`, inspect(obj[key], { colors: true, depth: 10 })));
  log('');
};

const shouldLog = () => {
  if (NODE_ENV !== 'development') return false;
  if (ENABLE_BASEDB_LOGGING === '1' || ENABLE_BASEDB_LOGGING === 'true') return true;
  return false;
};

module.exports = ({ tenant, client }) => new BaseDB({
  tenant,
  client,
  logger: shouldLog() ? logger : undefined,
});
