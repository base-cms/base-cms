const chalk = require('chalk');
const log = require('fancy-log');
const { join, resolve } = require('path');
const buildFiles = require('./build-files');
const { mkdir, copy, write } = require('../utils/filesystem');
const createPkg = require('./create-pkg');

// const writeTemplates = async (dir, answers, templateDir) => {
//   const toWrite = await buildFiles(templateDir, answers);

//   toWrite.targets.forEach(target => mkdir(dir, target));
//   toWrite.files.forEach(({ target, file, contents }) => {
//     const src = join(templateDir, target);
//     const dest = join(dir, target);
//     if (contents) {
//       write(dest, file, contents);
//     } else {
//       let destination = join(dest, file);
//       if (/gitignore$/.test(file)) {
//         destination = join(dest, file.replace('gitignore', '.gitignore'));
//       }
//       copy(join(src, file), destination);
//     }
//   });
// };

module.exports = async (dir, answers) => {
  const { projectName, withBootstrap, templateDir } = answers;
  log(chalk`Creating {cyan ${projectName}} in {green ${dir}}...`);

  const pkg = createPkg(answers);

  const dirs = [join(__dirname, 'templates/core')];
  if (withBootstrap) dirs.push(join(__dirname, 'templates/bootstrap'));
  if (templateDir) dirs.push(resolve(templateDir));

  const { targets, files } = await buildFiles(dirs, answers);

  targets.forEach(target => mkdir(dir, target));
  files.forEach((file) => {
    const { src } = file;
    const dest = join(dir, file.target);
    if (file.contents) {
      write(dest, file.file, file.contents);
    } else {
      let destination = join(dest, file.file);
      if (/gitignore$/.test(file.file)) {
        destination = join(dest, file.file.replace('gitignore', '.gitignore'));
      }
      copy(src, destination);
    }
  });

  write(dir, 'package.json', `${JSON.stringify(pkg, null, 2)}\n`);
};
