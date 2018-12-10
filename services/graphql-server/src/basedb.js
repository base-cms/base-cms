const { BaseDB, MongoDB } = require('@base-cms/db');
const { inspect } = require('util');
const {
  NODE_ENV,
  MONGO_DSN,
  TENANT_KEY: tenant,
  ENABLE_BASEDB_LOGGING,
} = require('./env');

const DEV = NODE_ENV === 'development';

const { log } = console;

const client = new MongoDB.Client(MONGO_DSN, {
  useNewUrlParser: true,
});

const logger = (obj) => {
  log('');
  Object.keys(obj).forEach(key => log(`${key}:`, inspect(obj[key], { colors: true, depth: 5 })));
  log('');
};

const shouldLog = () => {
  if (!DEV) return false;
  return ENABLE_BASEDB_LOGGING;
};

module.exports = new BaseDB({ tenant, client, logger: shouldLog() ? logger : undefined });
