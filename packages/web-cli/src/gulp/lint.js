const { parallel } = require('gulp');
const lintjs = require('./lint-js');
const lintsass = require('./lint-sass');

module.exports = (cwd, { jsopts, sassopts } = {}) => parallel(
  lintjs(cwd, jsopts),
  lintsass(cwd, sassopts),
);
