const { createBaseDB, createMongoClient } = require('@base-cms/db');
const { PICON_DSN } = require('../env');

const client = createMongoClient(PICON_DSN);

module.exports = tenant => createBaseDB({ tenant, client });
