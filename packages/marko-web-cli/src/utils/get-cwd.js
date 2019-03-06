const { resolve } = require('path');

module.exports = (path) => {
  const cwd = process.cwd();
  return path ? resolve(cwd, path) : cwd;
};
