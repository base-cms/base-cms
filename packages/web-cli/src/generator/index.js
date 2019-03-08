const chalk = require('chalk');
const log = require('fancy-log');
const { join } = require('path');
const buildFiles = require('./build-files');
const { mkdir, copy, write } = require('../utils/filesystem');
const createPkg = require('./create-pkg');

module.exports = async (dir, answers) => {
  const { projectName } = answers;
  log(chalk`Creating {cyan ${projectName}} ...`);

  const pkg = createPkg(answers);

  const templateDir = join(__dirname, 'templates/core');
  const toWrite = await buildFiles(templateDir, answers);

  toWrite.targets.forEach(target => mkdir(dir, target));
  toWrite.files.forEach(({ target, file, contents }) => {
    const src = join(templateDir, target);
    const dest = join(dir, target);
    if (contents) {
      write(dest, file, contents);
    } else {
      let destination = join(dest, file);
      if (/gitignore$/.test(file)) {
        destination = join(dest, file.replace('gitignore', '.gitignore'));
      }
      copy(join(src, file), destination);
    }
  });
  write(dir, 'package.json', `${JSON.stringify(pkg, null, 2)}\n`);
};
