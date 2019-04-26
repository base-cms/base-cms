const { basedbFactory, mongodbFactory } = require('@base-cms/db');
const { MONGO_DSN } = require('./env');

const client = mongodbFactory(MONGO_DSN);

module.exports = tenant => basedbFactory({ tenant, client });
