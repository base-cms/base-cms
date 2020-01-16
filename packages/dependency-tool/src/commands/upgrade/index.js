const chalk = require('chalk');
const log = require('fancy-log');
const cwd = require('../../utils/get-cwd');
const logCmd = require('../../utils/log-command');
const exit = require('../../utils/print-and-exit');
const loadPackage = require('./load-package');

const { isArray } = Array;

const execute = async ({ dir }) => {
  const pkg = loadPackage({ dir });
  log(chalk`Found package {magenta ${pkg.name}}`);
  if (isArray(pkg.workspaces)) {
    log(chalk`Workspaces detected. Will upgrade recursively: {gray ${JSON.stringify(pkg.workspaces)}}`);
  }
};

module.exports = ({ path }) => {
  const dir = cwd(path);
  logCmd('upgrade', dir);

  execute({ dir }).then(() => {
    exit(chalk`{green Upgrade complete!}`, 0);
  }).catch((e) => {
    exit(e.message);
  });
};
