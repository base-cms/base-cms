const {
  parallel,
  series,
} = require('gulp');
const clean = require('./clean');
const css = require('./css');
const fonts = require('./fonts');
const js = require('./js');

module.exports = cwd => series(clean(cwd), parallel(css(cwd), fonts(cwd), js(cwd)));
