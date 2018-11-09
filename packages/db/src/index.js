const MongoClient = require('./mongodb');

class BaseDB {
  /**
   *
   */
  constructor({ url, tenant } = {}, options) {
    this.tenant = tenant;
    this.dbOptions = options;
    this.client = new MongoClient(url, options);
  }
}

module.exports = BaseDB;
