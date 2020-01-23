const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const pump = require('pump');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const { dest, src } = require('gulp');
const completeTask = require('@base-cms/cli-utils/src/task-callback');

sass.compiler = require('node-sass');

module.exports = cwd => (cb) => {
  pump([
    src('server/styles/index.scss', { cwd }),
    sourcemaps.init(),
    sass(),
    postcss([
      autoprefixer({
        overrideBrowserslist: [
          '>= 1%',
          'not dead',
          'last 1 major version',
          'Chrome >= 45',
          'Firefox >= 38',
          'Edge >= 12',
          'Explorer >= 11',
          'iOS >= 9',
          'Safari >= 9',
          'Android >= 4.4',
          'Opera >= 30',
        ],
      }),
      cssnano(),
    ]),
    sourcemaps.write('.'),
    dest('dist/css', { cwd }),
  ], e => completeTask(e, cb));
};
