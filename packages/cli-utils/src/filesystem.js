const chalk = require('chalk');
const log = require('fancy-log');
const mkdirp = require('mkdirp');
const path = require('path');
const { writeFileSync, copyFileSync } = require('fs');

const MODE_0666 = 0o666;
const MODE_0755 = 0o755;

exports.MODE_0666 = MODE_0666;
exports.MODE_0755 = MODE_0755;

module.exports = {
  mkdir(base, dir) {
    const loc = path.join(base, dir);
    mkdirp.sync(loc, MODE_0755);
    log(chalk`{green Directory created}: {dim ${loc}}`);
  },
  write(base, file, str, mode) {
    const loc = path.join(base, file);
    writeFileSync(loc, str, { mode: mode || MODE_0666 });
    log(chalk`{green File created}: {dim ${loc}}`);
  },
  copy(src, dest) {
    copyFileSync(src, dest);
    log(chalk`{green File created}: {dim ${dest}}`);
  },
};
