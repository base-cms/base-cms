const ElasticClient = require('./client');
const env = require('../env');

const { ELASTICSEARCH_URL, NODE_ENV } = env;

const client = ElasticClient({
  host: ELASTICSEARCH_URL,
  log: {
    type: 'stdio',
    levels: NODE_ENV === 'test' ? [] : ['error', 'warning'],
  },
});

module.exports = client;
