const cache = require('gulp-cached');
const pump = require('pump');
const styelint = require('gulp-stylelint');
const { src } = require('gulp');
const logError = require('../utils/log-error');

module.exports = (cwd, options) => () => {
  pump([
    src('server/styles/**/*.scss', { cwd }),
    cache('basecms-lint-sass'),
    styelint({
      ...options,
      failAfterError: false,
      reporters: [
        { formatter: 'string', console: true },
      ],
    }),
  ], logError);
};
