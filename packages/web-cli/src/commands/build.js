const build = require('../gulp/build');
const logCmd = require('../utils/log-command');
const cwd = require('../utils/get-cwd');

module.exports = ({ path }) => {
  const dir = cwd(path);
  logCmd('build', dir);
  build(dir)();
};
