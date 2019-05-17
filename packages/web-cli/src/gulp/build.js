const {
  parallel,
  series,
} = require('gulp');
const del = require('del');
const css = require('./css');
const js = require('./js');
const manifest = require('./manifest');

module.exports = cwd => series(
  () => del('dist/**/*', { cwd }),
  parallel(css(cwd), js(cwd)),
  manifest(cwd),
);
