const cache = require('gulp-cached');
const eslint = require('gulp-eslint');
const pump = require('pump');
const { join } = require('path');
const { src } = require('gulp');
const completeTask = require('../utils/task-callback');

module.exports = (cwd, options) => (cb) => {
  pump([
    src(['server/**/*.js', `!${join(cwd, 'server/**/*.marko.js')}`], { cwd }),
    cache('basecms-lint-js'),
    eslint(options),
    eslint.format(),
  ], e => completeTask(e, cb));
};
