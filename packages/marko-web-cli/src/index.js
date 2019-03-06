const program = require('yargs');
const commands = require('./commands');

commands(program);

module.exports = () => program.argv;
