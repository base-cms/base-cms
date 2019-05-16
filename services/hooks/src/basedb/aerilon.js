const { createBaseDB, createMongoClient } = require('@base-cms/db');
const { AERILON_DSN } = require('../env');

const client = createMongoClient(AERILON_DSN);

module.exports = tenant => createBaseDB({ tenant, client });
