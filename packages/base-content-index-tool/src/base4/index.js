const env = require('../env');
const Client = require('./client');
const MongoClient = require('../mongodb/client');

const { MONGO_DSN, TENANT_KEY } = env;

const db = new MongoClient(MONGO_DSN, { useNewUrlParser: true });
module.exports = new Client({ db, tenantKey: TENANT_KEY });
