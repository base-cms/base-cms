#!/usr/bin/env node

const program = require('yargs');
const { gray, blue } = require('chalk');

const { log } = console;

const build = () => {
  log(blue('I should build now'));
};

const serve = (port, livereloadPort) => {
  log(blue('I should now be serving on port', port, 'and reloading on', livereloadPort));
};

program
  .usage('Usage: $0 <command> [options]')
  .command('serve', 'Starts the dev server', yargs => yargs
    .option('port', {
      alias: 'p',
      default: 5000,
      describe: gray('The port number to serve on'),
      type: 'number',
    })
    .option('livereload-port', {
      default: 7000,
      describe: gray('The livereload port'),
      type: 'number',
    }), ({ port, livereloadPort }) => {
    serve(port, livereloadPort);
  })
  .command('build', 'Build assets and save to dist folder', yargs => yargs, () => {
    build();
  });

module.exports = () => program.argv;
