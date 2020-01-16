const chalk = require('chalk');
const log = require('fancy-log');
const cwd = require('../../utils/get-cwd');
const logCmd = require('../../utils/log-command');
const exit = require('../../utils/print-and-exit');
const loadPackage = require('./load-package');
const exractDeps = require('./extract-deps');
const loadLatestVersions = require('./load-latest-versions');
const updatePackage = require('./update-package');
const savePackage = require('./save-package');
const loadWorkspaceDirs = require('./load-workspace-dirs');

const { isArray } = Array;

const execute = async ({ dir }) => {
  const pkg = loadPackage({ dir });
  log(chalk`Loaded package {magenta ${pkg.name}}`);
  const baseDeps = exractDeps(pkg);
  log(`Found ${baseDeps.size} dependencies`);

  const info = await loadLatestVersions([...baseDeps]);
  updatePackage(info, pkg);
  savePackage(dir, pkg);

  log(chalk`Upgrade of package {magenta ${pkg.name}} complete`);

  if (isArray(pkg.workspaces)) {
    log(chalk`Workspaces detected. Will upgrade recursively: {gray ${JSON.stringify(pkg.workspaces)}}`);
    const workspaceDirs = loadWorkspaceDirs(dir, pkg.workspaces);
    await Promise.all(workspaceDirs.map(async wsDir => execute({ dir: wsDir })));
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
