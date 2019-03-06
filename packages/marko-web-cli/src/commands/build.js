const log = require('fancy-log');
const { blue, gray } = require('chalk');
const { resolve } = require('path');
const build = require('../gulp/build');

const name = 'build';
const desc = 'Build BaseCMS assets and save them to the dist folder';

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
  log(`Running '${blue('build')}' command in '${gray(dir)}'`);
  const task = build(dir);
  try {
    task();
  } catch (e) {
    log('BIG EEEE', e);
  }
};

module.exports = program => program.command(name, desc, builder, handler);
