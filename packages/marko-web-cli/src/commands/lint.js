const log = require('fancy-log');
const { blue, gray } = require('chalk');
const { resolve } = require('path');
const lint = require('../gulp/lint');

const name = 'lint';
const desc = 'Lint JavaScript and SASS within the BaseCMS project';

const builder = (yargs) => {
  yargs.positional('path', {
    describe: 'A path (relative to the CWD) to execute the command in',
    type: 'string',
  });
};

const handler = ({ _ }) => {
  const [, path] = _;
  const cwd = process.cwd();
  const dir = path ? resolve(cwd, path) : cwd;
  log(`Running '${blue('lint')}' command in '${gray(dir)}'`);
  const task = lint(dir);
  task();
};

module.exports = program => program.command(name, desc, builder, handler);
