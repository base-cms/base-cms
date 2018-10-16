const { MongoClient } = require('mongodb');

class Client {
  /**
   *
   * @param {string} dsn
   * @param {?object} options
   */
  constructor(dsn, options) {
    this.dsn = dsn;
    this.options = options;
  }

  /**
   *
   * @param {string} name
   */
  async db(name) {
    const client = await this.connect();
    return client.db(name);
  }

  /**
   *
   * @param {string} dbName
   * @param {string} name
   */
  async collection(dbName, name) {
    const db = await this.db(dbName);
    return db.collection(name);
  }

  /**
   *
   * @param {boolean} force
   */
  async close(force) {
    if (this.promise) {
      await this.promise;
      await this.mongo.close(force);
    }
  }

  /**
   *
   */
  async connect() {
    if (!this.promise) {
      this.promise = MongoClient.connect(this.dsn, this.options);
    }
    const client = await this.promise;
    return client;
  }
}

module.exports = Client;
