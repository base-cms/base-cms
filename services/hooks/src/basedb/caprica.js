const { createBaseDB, createMongoClient } = require('@base-cms/db');
const { CAPRICA_DSN } = require('../env');

const client = createMongoClient(CAPRICA_DSN);

module.exports = tenant => createBaseDB({ tenant, client });
