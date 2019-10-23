const { createBaseDB, createMongoClient } = require('@base-cms/db');
const pkg = require('../package.json');
const { MONGO_DSN } = require('./env');

const { NODE_ENV } = process.env;
const appname = `${pkg.name} v${pkg.version} (env: ${NODE_ENV})`;

const client = createMongoClient(MONGO_DSN, { appname });

module.exports = (tenant, context) => createBaseDB({
  tenant,
  client,
  context,
});
