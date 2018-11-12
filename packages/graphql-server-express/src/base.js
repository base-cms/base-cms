const BaseDB = require('@base-cms/db');
const { BASECMS_MONGODB_URL } = require('./env');

module.exports = new BaseDB({
  url: BASECMS_MONGODB_URL,
}, { useNewUrlParser: true });
