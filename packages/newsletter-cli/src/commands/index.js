/* eslint-disable global-require */

const lintOptions = yargs => yargs
  .option('path', {
    describe: 'A path (relative to the CWD) to execute the command in.',
    type: 'string',
  });

const devOptions = yargs => yargs
  .option('file', {
    describe: 'The root newsletter server file to execute.',
    type: 'string',
  });

/**
 * Note: commands are required only when requested.
 * This saves the overhead of requiring _all_ command dependencies when only a single
 * command is executing.
 */
module.exports = (program) => {
  program
    .command('lint [path]', 'Lint JavaScript and SASS within the BaseCMS project', lintOptions, argv => require('./lint')(argv))
    .command('dev <file>', 'Start the BaseCMS website development server', devOptions, argv => require('./dev')(argv));
};
