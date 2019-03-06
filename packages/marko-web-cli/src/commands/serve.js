const log = require('fancy-log');

const name = 'serve';
const desc = 'Start the BaseCMS website development server.';

const builder = yargs => yargs
  .option('graphql-uri', {
    alias: 'g',
    default: process.env.GRAPHQL_URI,
    describe: 'The port number to serve on',
    type: 'number',
  })
  .option('port', {
    alias: 'p',
    default: 5000,
    describe: 'The port number to serve on',
    type: 'number',
  })
  .option('live-reload-port', {
    default: 7000,
    describe: 'The livereload port',
    type: 'number',
  });

const handler = (argv) => {
  log('serve this!', argv);
};

module.exports = program => program.command(name, desc, builder, handler);
