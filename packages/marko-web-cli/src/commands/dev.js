const log = require('fancy-log');

const name = 'dev';
const desc = 'Start the BaseCMS website development server.';

const builder = (yargs) => {
  yargs
    .positional('path', {
      describe: 'A path (relative to the CWD) to execute the command in',
      type: 'string',
    })
    .option('graphql-uri', {
      alias: 'gql',
      default: process.env.GRAPHQL_URI,
      describe: 'The GraphQL API URL',
      type: 'string',
    })
    .option('port', {
      alias: 'p',
      default: 5000,
      describe: 'The port number to serve on',
      type: 'number',
    })
    .option('exposed-port', {
      default: 5000,
      describe: 'The exposed (Docker) port number',
      type: 'number',
    })
    .option('live-reload-port', {
      default: 7000,
      describe: 'The livereload port',
      type: 'number',
    })
    .demandOption(['graphql-uri']);
};

const handler = (argv) => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  log('serve this!', argv);
};

module.exports = program => program.command(name, desc, builder, handler);
