const chalk = require('chalk');
const log = require('fancy-log');
const path = require('path');
const buildFiles = require('./build-files');
const { mkdir, copy, write } = require('../utils/filesystem');
const createPkg = require('./create-pkg');

module.exports = async (dir, answers) => {
  const { projectName } = answers;
  log(chalk`Creating {cyan ${projectName}} ...`);

  const pkg = createPkg(answers);

  const templateDir = path.join(__dirname, 'templates/core');
  const toWrite = await buildFiles(templateDir, answers);

  toWrite.targets.forEach(target => mkdir(dir, target));
  toWrite.files.forEach(({ target, file, contents }) => {
    const src = path.join(templateDir, target);
    const dest = path.join(dir, target);
    if (contents) {
      write(dest, file, contents);
    } else {
      copy(path.join(src, file), path.join(dest, file));
    }
  });
  write(dir, 'package.json', `${JSON.stringify(pkg, null, 2)}\n`);
};
