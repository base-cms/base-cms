const fetch = require('node-fetch');
const {
  TRAVIS_REPO_SLUG,
  TRAVIS_TAG,
  ENVIRONMENT,
  NR_APPID,
  NR_APIKEY,
  SLACK_WEBHOOK_URL,
} = require('./env');

const { log } = console;

const getColor = (action) => {
  if (action === 'started') return '#1d9bd1';
  if (action === 'finished') return 'good';
  if (action === 'failed') return 'danger';
  return '#ccc';
};

module.exports = async (action, withNr = false) => {
  const color = getColor(action);
  try {
    const payload = {
      attachments: [{
        color,
        text: `Deployment of \`${TRAVIS_REPO_SLUG}\` @ \`${TRAVIS_TAG}\` to \`${ENVIRONMENT}\` has ${action}.`,
      }],
    };
    const res = await fetch(SLACK_WEBHOOK_URL, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`Notification failed: ${res.status} ${res.statusText}`);
  } catch (e) {
    log(`Error: ${e}`, e);
  }

  // New Relic
  try {
    if (!withNr) return;
    if (!NR_APIKEY || !NR_APPID) return;
    const payload = {
      deployment: {
        revision: TRAVIS_TAG,
        description: action,
        user: 'TravisCD',
      },
    };
    const res = await fetch(`https://api.newrelic.com/v2/applications/${NR_APPID}/deployments.json`, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': NR_APIKEY,
      },
    });
    if (!res.ok) throw new Error(`Notification failed: ${res.status} ${res.statusText}`);
  } catch (e) {
    log(`Error: ${e}`, e);
  }
};
