const cache = require('gulp-cached');
const eslint = require('gulp-eslint');
const pump = require('pump');
const { src } = require('gulp');
const completeTask = require('@base-cms/cli-utils/src/task-callback');

module.exports = (cwd, options) => (cb) => {
  pump([
    src(['**/*.js', '!**/*.marko.js'], { cwd }),
    cache('basecms-newsletters-lint-js'),
    eslint(options),
    eslint.results((results, lintCb) => {
      lintCb();
      cb();
    }),
    eslint.format(),
  ], e => completeTask(e, cb));
};
