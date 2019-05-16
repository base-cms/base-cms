const {
  parallel,
  series,
} = require('gulp');
const del = require('del');
const css = require('./css');
const js = require('./js');

module.exports = cwd => series(
  () => del('dist/**/*', { cwd }),
  parallel(css(cwd), js(cwd)),
  () => del('dist/tmp', { cwd }),
);
