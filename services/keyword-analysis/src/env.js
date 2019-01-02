const { envalid } = require('@base-cms/tooling');

const {
  custom,
  bool,
  cleanEnv,
} = envalid;
const { nonemptystr } = custom;

module.exports = cleanEnv(process.env, {
  MONGO_DSN: nonemptystr({ desc: 'The MongoDB DSN to connect to.' }),
  MONGO_LOGGING: bool({ desc: 'Whether to enable Mongo query logging to the terminal.', default: false }),
  TENANT_KEY: nonemptystr({ desc: 'The Base4 tenant to connect import from, e.g. cygnus_ofcr' }),
  ELASTICSEARCH_URL: nonemptystr({ desc: 'The Elasticsearch host to connect to.' }),
  ELASTIC_INDEX: nonemptystr({ desc: 'The Elasticsearch index to populate content items into.', default: 'keyword_analysis' }),
  ELASTIC_TYPE: nonemptystr({ desc: 'The Elasticsearch index document type to populate.', default: 'content' }),
});
