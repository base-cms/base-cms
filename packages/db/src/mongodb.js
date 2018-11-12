const { MongoClient, ObjectID } = require('mongodb');

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
   * @param {object} [options]
   */
  async db(name, options) {
    const client = await this.connect();
    return client.db(name, options);
  }

  /**
   *
   * @param {string} dbName
   * @param {string} name
   * @param {object} [options]
   */
  async collection(dbName, name, options) {
    const db = await this.db(dbName);
    return db.collection(name, options);
  }

  /**
   *
   * @param {boolean} force
   */
  async close(force) {
    if (this.promise) {
      const client = await this.promise;
      await client.close(force);
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

module.exports = {
  Client,
  ObjectID,
};
