const envalid = require('@base-cms/env');

const {
  bool,
  cleanEnv,
  validators,
  num,
  port,
} = envalid;
const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  PORT: port({ desc: 'The internal port to run on.', default: 80 }),
  EXPOSED_PORT: port({ desc: 'The external port to run on.', default: 80 }),
  GOOGLE_DATA_MONGO_DSN: nonemptystr({ desc: 'The Base MongoDB connection URL.' }),
  GOOGLE_API_KEY: nonemptystr({ desc: 'The Google Data API key.' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  TERMINUS_TIMEOUT: num({ desc: 'Number of milliseconds before forceful exiting', default: 1000 }),
  TERMINUS_SHUTDOWN_DELAY: num({ desc: 'Number of milliseconds before the HTTP server starts its shutdown', default: 10000 }),
});
