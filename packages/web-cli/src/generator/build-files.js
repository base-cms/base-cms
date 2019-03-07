const handlebars = require('handlebars');
const fs = require('fs');
const readdir = require('recursive-readdir');
const path = require('path');
const ifrm = require('./if-rm');

handlebars.registerHelper('if-rm', ifrm);

const cleanLines = contents => contents.replace(/\s^\s*__REMOVELINE__\s*$/gm, '').replace(/__REMOVELINE__/g, '');

module.exports = async (templatesDir, answers) => {
  // const templates = path.join(__dirname, 'templates');
  const files = await readdir(templatesDir);
  const targets = [];

  const toWrite = files.map((file) => {
    const {
      dir,
      ext,
      base,
      name,
    } = path.parse(file);

    const target = dir.replace(templatesDir, '');
    targets.push(target);
    const info = { target };

    if (ext === '.hbs') {
      info.file = name;
      info.contents = cleanLines(handlebars.compile(fs.readFileSync(file).toString(), {
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
