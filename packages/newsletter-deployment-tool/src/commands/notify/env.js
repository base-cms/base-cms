const {
  cleanEnv,
  makeValidator,
  url,
  str,
} = require('envalid');

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  ENVIRONMENT: nonemptystr({ desc: 'The environment to deploy to.', choices: ['production', 'staging'] }),
  NR_APIKEY: str({ desc: 'The New Relic API key', default: '' }),
  NR_APPID: str({ desc: 'The New Relic application ID that should be notified.', default: '' }),
  RANCHER_CLUSTERID: nonemptystr({ desc: 'The Rancher cluster to deploy to.' }),
  SLACK_WEBHOOK_URL: url({ desc: 'The Slack webhook to send notifications to.' }),
  TRAVIS_REPO_SLUG: nonemptystr({ desc: 'The name of the repository.' }),
  TRAVIS_TAG: nonemptystr({ desc: 'The version to deploy.' }),
});
