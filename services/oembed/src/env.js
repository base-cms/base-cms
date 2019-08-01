const { envalid } = require('@base-cms/tooling');

const {
  custom,
  cleanEnv,
  bool,
} = envalid;
const { nonemptystr } = custom;

module.exports = cleanEnv(process.env, {
  EMBEDLY_API_KEY: nonemptystr({ desc: 'The Embed.ly API key..' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
});
