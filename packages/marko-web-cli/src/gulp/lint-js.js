const cache = require('gulp-cached');
const eslint = require('gulp-eslint');
const pump = require('pump');
const { src } = require('gulp');
const logError = require('../utils/log-error');

module.exports = (cwd, options) => () => {
  pump([
    src(['server/**/*.js', '!server/**/*.marko.js'], { cwd }),
    cache('basecms-lint-js'),
    eslint(options),
    eslint.format(),
  ], logError);
};
