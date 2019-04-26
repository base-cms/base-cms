const { envalid } = require('@base-cms/tooling');

const {
  custom,
  cleanEnv,
  bool,
  num,
} = envalid;
const { nonemptystr } = custom;

module.exports = cleanEnv(process.env, {
  MONGO_DSN: nonemptystr({ desc: 'The Base MongoDB connection URL.' }),
  ENABLE_BASEDB_LOGGING: bool({ desc: 'Whether the BaseDB instance should log to the console.', default: false }),
  PAGE_SIZE: num({ desc: 'The number of urls per page', default: 5000 }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
});
