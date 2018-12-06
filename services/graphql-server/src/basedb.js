const { BaseDB, MongoDB } = require('@base-cms/db');
const { inspect } = require('util');
const { NODE_ENV, MONGO_DSN, TENANT_KEY: tenant } = require('./env');

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

module.exports = new BaseDB({ tenant, client, logger: DEV ? logger : undefined });
