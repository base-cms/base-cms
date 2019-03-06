const log = require('fancy-log');

const name = 'build';
const desc = 'Build BaseCMS assets and save them to the dist folder';

const builder = yargs => yargs;

const handler = (argv) => {
  log('build this!', argv);
};

module.exports = program => program.command(name, desc, builder, handler);
