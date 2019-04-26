const { createBaseDB, createMongoClient } = require('@base-cms/db');
const { MONGO_DSN } = require('./env');

const client = createMongoClient(MONGO_DSN);

module.exports = tenant => createBaseDB({ tenant, client });
