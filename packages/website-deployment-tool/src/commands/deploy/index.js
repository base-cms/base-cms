/* eslint-disable global-require */
module.exports = (yargs) => {
  yargs.command(['deploy <site> <namespace>'], 'Executes a deployment.', () => {}, argv => require('./deploy')(argv));
  yargs.command(['deploy-service <service> <namespace>'], 'Executes a deployment.', () => {}, argv => require('./service')(argv));
};
