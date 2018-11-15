const { MongoDB } = require('@base-cms/db');
const { MONGO_DSN } = require('./env');

module.exports = new MongoDB.Client(MONGO_DSN, {
  useNewUrlParser: true,
});
