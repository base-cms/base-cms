const handlebars = require('handlebars');
const ignore = require('ignore');
const readdir = require('recursive-readdir');
const { join, parse } = require('path');
const { readFileSync } = require('fs');
const ifrm = require('./if-rm');

handlebars.registerHelper('if-rm', ifrm);

const cleanLines = contents => contents.replace(/\s^\s*__REMOVELINE__\s*$/gm, '').replace(/__REMOVELINE__/g, '');

module.exports = async (templatesDir, answers) => {
  const files = await readdir(templatesDir);

  // Create "relative" versions of each file.
  const relative = files.map(f => f.replace(`${templatesDir}/`, ''));

  // Load any .gitignore files and filter out files that should be ignored.
  const toIgnore = ignore();
  files.filter(f => /gitignore$/.test(f)).map(f => readFileSync(f).toString()).forEach(patterns => toIgnore.add(patterns));
  const filteredFiles = toIgnore.filter(relative);

  const targets = [];

  const toWrite = filteredFiles.map((f) => {
    const file = join(templatesDir, f);
    const {
      dir,
      ext,
      base,
      name,
    } = parse(file);

    const target = dir.replace(templatesDir, '');
    targets.push(target);
    const info = { target };

    if (ext === '.hbs') {
      // Render the template contents with command line answers.
      info.file = name;
      info.contents = cleanLines(handlebars.compile(readFileSync(file).toString(), {
        noEscape: true,
      })(answers));
    } else {
      info.file = base;
    }
    return info;
  });
  return {
    targets: [...new Set(targets)].filter(v => v),
    files: toWrite,
  };
};
