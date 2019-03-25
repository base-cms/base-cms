const {
  parallel,
  series,
} = require('gulp');
const clean = require('./clean');
const css = require('./css');
const js = require('./js');

module.exports = cwd => series(clean(cwd), parallel(css(cwd), js(cwd)));
