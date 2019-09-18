const cache = require('gulp-cached');
const eslint = require('gulp-eslint');
const pump = require('pump');
const { src } = require('gulp');
const completeTask = require('../utils/task-callback');

module.exports = (cwd, options) => (cb) => {
  pump([
    src(['server/**/*.js', '!server/**/*.marko.js'], { cwd }),
    cache('basecms-lint-js'),
    eslint(options),
    eslint.results((results, lintCb) => {
      lintCb();
      cb();
    }),
    eslint.format(),
    eslint.failAfterError(),
  ], e => completeTask(e, cb));
};
