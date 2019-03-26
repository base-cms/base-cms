const program = require('yargs');
const log = require('fancy-log');
const commands = require('./commands');

log('CLI starting...');
program
  .usage('Usage: $0 <command> [options]')
  .help()
  .demandCommand();

commands(program);

module.exports = () => program.argv;
