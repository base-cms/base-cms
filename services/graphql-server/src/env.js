const { envalid } = require('@base-cms/tooling');

const {
  custom,
  cleanEnv,
  bool,
  port,
  str,
} = envalid;
const { nonemptystr } = custom;

module.exports = cleanEnv(process.env, {
  MONGO_DSN: nonemptystr({ desc: 'The Base MongoDB connection URL.' }),
  GRAPHQL_ENDPOINT: nonemptystr({ desc: 'The GraphQL endpoint', default: '/' }),
  PORT: port({ desc: 'The internal port to run on.', default: 80 }),
  EXPOSED_PORT: port({ desc: 'The external port to run on.', default: 80 }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  ENGINE_API_KEY: nonemptystr({ desc: 'The Apollo Engine API key', devDefault: '(unset)' }),
  BASE4_REST_USERNAME: str({ desc: 'The Base4 REST API username.', default: '' }),
  BASE4_REST_PASSWORD: str({ desc: 'The Base4 REST API password.', default: '' }),
});
