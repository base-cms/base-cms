const cache = require('gulp-cached');
const eslint = require('gulp-eslint');
const { join } = require('path');
const { src } = require('gulp');

module.exports = (dir, options) => () => src([
  join(dir, 'server/**/*.js'),
  `!${join(dir, 'server/**/*.marko.js')}`, // ignore marko.js files
])
  .pipe(cache('basecms-lint-js'))
  .pipe(eslint(options))
  .pipe(eslint.format());
