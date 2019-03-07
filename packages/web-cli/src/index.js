const program = require('yargs');
const commands = require('./commands');

program.usage('Usage: $0 <command> [options]');

commands(program);

module.exports = () => program.argv;
