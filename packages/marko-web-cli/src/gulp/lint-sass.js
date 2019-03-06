const cache = require('gulp-cached');
const styelint = require('gulp-stylelint');
const { join } = require('path');
const { src } = require('gulp');

module.exports = (dir, options) => () => src(join(dir, 'server/styles/**/*.scss'))
  .pipe(cache('basecms-lint-sass'))
  .pipe(styelint({
    ...options,
    failAfterError: false,
    reporters: [
      { formatter: 'string', console: true },
    ],
  }));
