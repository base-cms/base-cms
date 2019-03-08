const logCmd = require('../utils/log-command');
const cwd = require('../utils/get-cwd');
const lint = require('../gulp/lint');

module.exports = ({ _ }) => {
  const [, path] = _;
  const dir = cwd(path);
  logCmd('lint', dir);
  lint(dir)();
};
