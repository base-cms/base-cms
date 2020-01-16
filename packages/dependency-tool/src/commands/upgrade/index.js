const chalk = require('chalk');
const log = require('fancy-log');
const cwd = require('../../utils/get-cwd');
const logCmd = require('../../utils/log-command');
const exit = require('../../utils/print-and-exit');
const loadPackage = require('./load-package');
const exractDeps = require('./extract-deps');

const { isArray } = Array;

const execute = async ({ dir }) => {
  const pkg = loadPackage({ dir });
  log(chalk`Loaded package {magenta ${pkg.name}}`);
  if (isArray(pkg.workspaces)) {
    log(chalk`Workspaces detected. Will upgrade recursively: {gray ${JSON.stringify(pkg.workspaces)}}`);
  }
  const baseDeps = exractDeps(pkg);
  log(`Found ${baseDeps.size} dependencies`);
  log(chalk`Upgrade of package {magenta ${pkg.name}} complete`);
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
