const { createBaseDB, createMongoClient } = require('@base-cms/db');
const { LEONIS_DSN } = require('../env');

const client = createMongoClient(LEONIS_DSN);

module.exports = tenant => createBaseDB({ tenant, client });
