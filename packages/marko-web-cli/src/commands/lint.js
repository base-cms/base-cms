const logCmd = require('../utils/log-command');
const cwd = require('../utils/get-cwd');
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
  const dir = cwd(path);
  logCmd('lint', dir);
  lint(dir)();
};

module.exports = program => program.command(name, desc, builder, handler);
