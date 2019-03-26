const chalk = require('chalk');
const log = require('fancy-log');
const { join } = require('path');
const buildFiles = require('./build-files');
const { mkdir, copy, write } = require('../utils/filesystem');
const createPkg = require('./create-pkg');

const writeTemplates = async (dir, answers, templateDir) => {
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
};

module.exports = async (dir, answers) => {
  const { projectName } = answers;
  log(chalk`Creating {cyan ${projectName}} in {green ${dir}}...`);

  const pkg = createPkg(answers);

  log(chalk`Creating {green core} templates`);
  await writeTemplates(dir, answers, join(__dirname, 'templates/core'));

  if (answers.withBootstrap) {
    log(chalk`Creating {green bootstrap} templates`);
    await writeTemplates(dir, answers, join(__dirname, 'templates/bootstrap'));
  }

  if (answers.templateDir) {
    log(chalk`Creating {green custom} templates`);
    await writeTemplates(dir, answers, answers.templateDir);
  }

  write(dir, 'package.json', `${JSON.stringify(pkg, null, 2)}\n`);
};
