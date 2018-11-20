const { BaseDB, MongoDB } = require('@base-cms/db');
const { MONGO_DSN, TENANT_KEY: tenant } = require('./env');

const client = new MongoDB.Client(MONGO_DSN, {
  useNewUrlParser: true,
});

module.exports = new BaseDB({ tenant, client });
