const log = require('fancy-log');

const name = 'new';
const desc = 'Create a new BaseCMS website project.';

const builder = yargs => yargs;

const handler = (argv) => {
  log('create new project!', argv);
};

module.exports = program => program.command(name, desc, builder, handler);
