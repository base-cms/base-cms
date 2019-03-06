const { parallel } = require('gulp');
const lintjs = require('./lint-js');
const lintsass = require('./lint-sass');

module.exports = (dir, { jsopts, sassopts } = {}) => parallel(
  lintjs(dir, jsopts),
  lintsass(dir, sassopts),
);
