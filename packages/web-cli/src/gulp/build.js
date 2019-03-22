const {
  parallel,
} = require('gulp');
const css = require('./css');
const js = require('./js');

module.exports = cwd => parallel(css(cwd), js(cwd));
