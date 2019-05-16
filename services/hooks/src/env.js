const { envalid } = require('@base-cms/tooling');

const {
  custom,
  cleanEnv,
  bool,
} = envalid;
const { nonemptystr } = custom;

module.exports = cleanEnv(process.env, {
  AERILON_DSN: nonemptystr({ desc: 'The Base Aerilon MongoDB connection URL.' }),
  PICON_DSN: nonemptystr({ desc: 'The Base Picon MongoDB connection URL.' }),
  CAPRICA_DSN: nonemptystr({ desc: 'The Base Caprica MongoDB connection URL.' }),
  ENABLE_BASEDB_LOGGING: bool({ desc: 'Whether the BaseDB instance should log to the console.', default: false }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
});
