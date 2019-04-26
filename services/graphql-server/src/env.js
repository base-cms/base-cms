const { envalid } = require('@base-cms/tooling');

const {
  custom,
  cleanEnv,
  bool,
} = envalid;
const { nonemptystr } = custom;

module.exports = cleanEnv(process.env, {
  MONGO_DSN: nonemptystr({ desc: 'The Base MongoDB connection URL.' }),
  ENABLE_BASEDB_LOGGING: bool({ desc: 'Whether the BaseDB instance should log to the console.', default: false }),
  GRAPHQL_ENDPOINT: nonemptystr({ desc: 'The GraphQL endpoint', default: '/' }),
  CDN_IMAGE_HOSTNAME: nonemptystr({ desc: 'The CDN hostname that serves images.', default: 'base.imgix.net' }),
  CDN_ASSET_HOSTNAME: nonemptystr({ desc: 'The CDN hostname that serves assets/documents.', default: 'cdn.baseplatform.io' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  ENGINE_API_KEY: nonemptystr({ desc: 'The Apollo Engine API key', devDefault: '(unset)' }),
});
