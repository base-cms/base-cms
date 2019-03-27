/* eslint-disable global-require */

const lintOptions = yargs => yargs
  .option('path', {
    describe: 'A path (relative to the CWD) to execute the command in.',
    type: 'string',
  });

const buildOptions = yargs => yargs
  .option('path', {
    describe: 'A path (relative to the CWD) to execute the command in.',
    type: 'string',
  });

const devOptions = yargs => yargs
  .option('file', {
    describe: 'The website server file to execute.',
    type: 'string',
  });

const createOptions = yargs => yargs
  .option('path', {
    describe: 'A path (relative to the CWD) to create the project in.',
    type: 'string',
  })
  .option('npm-org', {
    describe: 'Your NPM org name. Will prefix the package name.',
    type: 'string',
  })
  .option('yarn', {
    describe: 'Whether to use Yarn instead of NPM for installing dependencies.',
    type: 'boolean',
    default: true,
  })
  .option('skip-install', {
    describe: 'Whether to skip installing dependencies.',
    type: 'boolean',
    default: false,
  })
  .option('template-dir', {
    describe: 'Custom skeleton template directory.',
    type: 'string',
  })
  .option('site-name', {
    describe: 'The website name.',
    type: 'string',
  })
  .option('graphql-uri', {
    describe: 'The website GraphQL URI.',
    type: 'string',
  });

/**
 * Note: commands are required only when requested.
 * This saves the overhead of requiring _all_ command dependencies when only a single
 * command is executing.
 */
module.exports = (program) => {
  program
    .command('lint <path>', 'Lint JavaScript and SASS within the BaseCMS project', lintOptions, argv => require('./lint')(argv))
    .command('build <path>', 'Build BaseCMS assets and save them to the dist folder', buildOptions, argv => require('./build')(argv))
    .command('dev <file>', 'Start the BaseCMS website development server', devOptions, argv => require('./dev')(argv))
    .command('create <path>', 'Create a new BaseCMS website project', createOptions, argv => require('./create')(argv));
};
