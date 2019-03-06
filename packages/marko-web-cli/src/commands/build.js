const build = require('../gulp/build');
const logCmd = require('../utils/log-command');
const cwd = require('../utils/get-cwd');

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
  const dir = cwd(path);
  logCmd('build', dir);
  build(dir)();
};

module.exports = program => program.command(name, desc, builder, handler);
