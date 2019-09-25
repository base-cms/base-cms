const { envalid } = require('@base-cms/tooling');

const {
  custom,
  cleanEnv,
  bool,
  num,
  port,
} = envalid;
const { nonemptystr } = custom;

module.exports = cleanEnv(process.env, {
  GRAPHQL_URI: nonemptystr({ desc: 'The BaseCMS GraphQL API URL.' }),
  PORT: port({ desc: 'The internal port to run on.', default: 80 }),
  EXPOSED_PORT: port({ desc: 'The external port to run on.', default: 80 }),
  PAGE_SIZE: num({ desc: 'The number of urls per page', default: 5000 }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
});
