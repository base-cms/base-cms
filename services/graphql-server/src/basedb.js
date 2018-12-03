const { BaseDB, MongoDB } = require('@base-cms/db');
const { NODE_ENV, MONGO_DSN, TENANT_KEY: tenant } = require('./env');

const DEV = NODE_ENV === 'development';

const { log } = console;

const client = new MongoDB.Client(MONGO_DSN, {
  useNewUrlParser: true,
});

const logger = (method, namespace, data) => {
  log('');
  log(method, namespace);
  Object.keys(data).forEach(key => log(`${key}:`, data[key]));
  log('');
};

module.exports = new BaseDB({ tenant, client, logger: DEV ? logger : undefined });
