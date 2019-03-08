const log = require('fancy-log');
const chalk = require('chalk');
const { spawn } = require('child_process');

module.exports = async (dir, useYarn) => {
  const cmd = useYarn ? 'yarn install' : 'npm install';
  log(chalk`Installing dependencies via {magenta ${cmd}}...`);
  const installer = await spawn(cmd, {
    stdio: 'inherit',
    shell: true,
    cwd: dir,
  });
  return new Promise((resolve, reject) => {
    installer.on('error', reject);
    installer.on('close', (code, signal) => {
      if (code) {
        reject(new Error(`Installer exited with code ${code}`));
      } else if (signal) {
        reject(new Error(`Installer exited with signal ${signal}`));
      } else {
        resolve();
      }
    });
  });
};
