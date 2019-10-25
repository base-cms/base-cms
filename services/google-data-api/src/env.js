const envalid = require('@base-cms/env');

const { bool, cleanEnv, validators } = envalid;
const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  GOOGLE_DATA_MONGO_DSN: nonemptystr({ desc: 'The Base MongoDB connection URL.' }),
  GOOGLE_API_KEY: nonemptystr({ desc: 'The Google Data API key.' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
});
