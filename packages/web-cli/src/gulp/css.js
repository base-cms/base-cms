const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const pump = require('pump');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const { dest, src } = require('gulp');
const completeTask = require('../utils/task-callback');

sass.compiler = require('node-sass');
// @todo Add fingerprinting!
module.exports = cwd => (cb) => {
  pump([
    src('server/styles/index.scss', { cwd }),
    sourcemaps.init(),
    sass(),
    postcss([
      autoprefixer({
        browsers: [
          '>= 1%',
          'not dead',
          'last 1 major version',
          'Chrome >= 45',
          'Firefox >= 38',
          'Edge >= 12',
          'Explorer >= 10',
          'iOS >= 9',
          'Safari >= 9',
          'Android >= 4.4',
          'Opera >= 30',
        ],
      }),
      cssnano(),
    ]),
    sourcemaps.write('.'),
    dest('dist', { cwd }),
  ], e => completeTask(e, cb));
};
