/* eslint-disable global-require */
module.exports = (yargs) => {
  yargs.command(['notify-started'], 'Notifies environment that a deployment has started.', () => {}, () => require('./started')());
  yargs.command(['notify-finished'], 'Notifies environment that a deployment has finished.', () => {}, () => require('./finished')());
  yargs.command(['notify-failed'], 'Notifies environment that a deployment has failed.', () => {}, () => require('./failed')());
};
