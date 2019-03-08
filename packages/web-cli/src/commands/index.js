/* eslint-disable global-require */

/**
 * Note: commands are required only when requested.
 * This saves the overhead of requiring _all_ command dependencies when only a single
 * command is executing.
 */
module.exports = (program) => {
  program
    .command('lint', 'Lint JavaScript and SASS within the BaseCMS project', (yargs) => {
      yargs.positional('path', {
        describe: 'A path (relative to the CWD) to execute the command in',
        type: 'string',
      });
    }, argv => require('./lint')(argv))

    .command('build', 'Build BaseCMS assets and save them to the dist folder', (yargs) => {
      yargs.positional('path', {
        describe: 'A path (relative to the CWD) to execute the command in',
        type: 'string',
      });
    }, argv => require('./build')(argv))

    .command('dev', 'Start the BaseCMS website development server', (yargs) => {
      yargs
        .positional('file', {
          describe: 'The website server file to execute.',
          type: 'string',
        });
    }, argv => require('./dev')(argv))

    .command('create', 'Create a new BaseCMS website project', (yargs) => {
      yargs.positional('path', {
        describe: 'A path (relative to the CWD) to create the project in',
        type: 'string',
      }).option('npm-org', {
        describe: 'Your NPM org name. Will prefix the package name.',
        type: 'string',
      });
    }, argv => require('./create')(argv));
};
