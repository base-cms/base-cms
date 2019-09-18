const defaultCompiler = require('marko/compiler');
const glob = require('glob');
const fs = require('fs');

const { log } = console;

module.exports = ({
  dir = process.cwd(),
  ignore = ['node_modules/**'],
  patterns = ['**/*.marko'],
  clean = false,
  silent = false,
  compiler = defaultCompiler,
} = {}) => {
  const globOptions = {
    ignore,
    cwd: dir,
    matchBase: true,
    absolute: true,
  };

  return Promise.all(patterns.map(pattern => new Promise((resolve, reject) => {
    glob(pattern, globOptions, (err, files) => {
      if (err) return reject(err);
      files.map((file) => {
        const serverFile = `${file}.js`;
        if (clean) {
          try {
            if (!silent) log(`Deleting ${serverFile}`);
            fs.unlinkSync(serverFile);
          } catch (e) {
            log(`An error occurred when deleting ${serverFile}`);
          }
        } else {
          const compiled = compiler.compileFile(file);
          fs.writeFileSync(serverFile, compiled);
          if (!silent) log(`Wrote ${serverFile}`);
        }
        return resolve();
      });
      return resolve();
    });
  })));
};
