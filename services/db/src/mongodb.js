const { MongoDB } = require('@base-cms/db');
const { BASECMS_MONGODB_URL } = require('./env');

module.exports = new MongoDB.Client(BASECMS_MONGODB_URL, {
  useNewUrlParser: true,
});
