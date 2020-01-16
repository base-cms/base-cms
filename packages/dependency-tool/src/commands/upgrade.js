const cwd = require('../utils/get-cwd');
const logCmd = require('../utils/log-command');

module.exports = ({ path }) => {
  const dir = cwd(path);
  logCmd('upgrade', dir);
};
