const {
  parallel,
} = require('gulp');
const css = require('./css');

module.exports = dir => parallel(css(dir));
