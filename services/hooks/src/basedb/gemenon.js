const { createBaseDB, createMongoClient } = require('@base-cms/db');
const { GEMENON_DSN } = require('../env');

const client = createMongoClient(GEMENON_DSN);

module.exports = tenant => createBaseDB({ tenant, client });
