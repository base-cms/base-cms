const Octokit = require('@octokit/rest');
const { GITHUB_PERSONAL_ACCESS_TOKEN } = require('./env');
const { name, version } = require('../package.json');

module.exports = new Octokit({
  auth: GITHUB_PERSONAL_ACCESS_TOKEN,
  userAgent: `${name} v${version}`,
});
