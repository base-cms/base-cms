/* eslint-disable global-require */
module.exports = (yargs) => {
  yargs.command(['deploy <tenant> <namespace>'], 'Executes a deployment.', () => {}, argv => require('./deploy')(argv));
};
