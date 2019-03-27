const handlebars = require('handlebars');
const ignore = require('ignore');
const readdir = require('recursive-readdir');
const { parse } = require('path');
const { readFileSync } = require('fs');
const ifrm = require('./if-rm');

handlebars.registerHelper('if-rm', ifrm);

const cleanLines = contents => contents.replace(/\s^\s*__REMOVELINE__\s*$/gm, '').replace(/__REMOVELINE__/g, '');
const getSourceFiles = async src => ({ src, items: await readdir(src) });
const getDirectoryFiles = dirs => Promise.all(dirs.map(getSourceFiles));

module.exports = async (dirs = [], answers) => {
  const dirFiles = await getDirectoryFiles(dirs);
  const files = dirFiles.reduce((obj, { src, items }) => {
    const set = items.reduce((s, f) => ({ ...s, [f.replace(`${src}/`, '')]: f }), {});
    return { ...obj, ...set };
  }, {});

  const relative = Object.keys(files);
  const absolute = relative.map(r => files[r]);

  // Load any .gitignore files and filter out files that should be ignored.
  const toIgnore = ignore();
  absolute.filter(f => /gitignore$/.test(f)).map(f => readFileSync(f).toString()).forEach(patterns => toIgnore.add(patterns));

  const filteredFiles = toIgnore.filter(relative);

  const targets = [];

  const toWrite = filteredFiles.map((r) => {
    const file = files[r];
    const {
      dir,
      ext,
      base,
      name,
    } = parse(file);

    const target = dirs.reduce((t, src) => t.replace(src, ''), dir);
    targets.push(target);
    const info = { src: file, target };

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
