const cache = require('gulp-cached');
const pump = require('pump');
const styelint = require('gulp-stylelint');
const { src } = require('gulp');
const completeTask = require('../utils/task-callback');

module.exports = (cwd, options) => (cb) => {
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
  ], e => completeTask(e, cb));
};
