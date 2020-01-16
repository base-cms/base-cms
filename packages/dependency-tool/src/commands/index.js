/* eslint-disable global-require */

const upgradeOptions = yargs => yargs
  .option('path', {
    describe: 'A path (relative to the CWD) to execute the command in.',
    type: 'string',
  });

/**
 * Note: commands are required only when requested.
 * This saves the overhead of requiring _all_ command dependencies when only a single
 * command is executing.
 */
module.exports = (program) => {
  program
    .command('upgrade [path]', 'Upgrade @base-cms dependencies in the specified folder/project', upgradeOptions, argv => require('./upgrade')(argv));
};
