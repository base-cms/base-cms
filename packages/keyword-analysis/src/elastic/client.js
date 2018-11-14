const { Client } = require('elasticsearch');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const ElasticClient = (options) => {
  const client = new Client(options);
  let connected = false;
  let delayed;

  return {
    get client() {
      return client;
    },

    async connect() {
      if (!connected) {
        if (delayed) {
          await delayed;
        }
        try {
          await client.cluster.health({});
          connected = true;
        } catch (e) {
          delayed = delay(3000);
          await this.connect();
        }
      }
    },

    async disconnect() {
      return this.client.close();
    },

    async bulk(params) {
      await this.connect();
      return new Promise((resolve, reject) => {
        client.bulk(params, (err, resp) => {
          if (err) {
            reject(err);
          } else {
            resolve(resp);
          }
        });
      });
    },

    async indexExists(index) {
      await this.connect();
      return this.client.indices.exists({ index });
    },

    async createIndex(index, body) {
      const exists = await this.indexExists(index);
      if (!exists) await this.client.indices.create({ index, body });
    },

    async deleteIndex(index) {
      const exists = await this.indexExists(index);
      if (exists) await this.client.indices.delete({ index });
    },

    async putSettings(index, body) {
      await this.connect();
      return this.client.indices.putSettings({ index, body });
    },

    async putMapping(index, type, body) {
      await this.connect();
      return this.client.indices.putMapping({ index, type, body });
    },

    async closeIndex(index, body) {
      await this.connect();
      return this.client.indices.close({ index, body });
    },

    async openIndex(index, body) {
      await this.connect();
      return this.client.indices.open({ index, body });
    },

    async analyze(index, body, opts = {}) {
      await this.connect();
      const params = {
        ...opts,
        index,
        body,
      };
      return this.client.indices.analyze(params);
    },

    async search(index, type, body, opts = {}) {
      await this.connect();
      const params = {
        ...opts,
        index,
        type,
        body,
      };
      return this.client.search(params);
    },

    async count(index, type, body, opts = {}) {
      await this.connect();
      const params = {
        ...opts,
        index,
        type,
        body,
      };
      return this.client.count(params);
    },
  };
};

module.exports = ElasticClient;
