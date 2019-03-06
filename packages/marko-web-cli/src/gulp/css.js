const {
  dest,
  src,
} = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

module.exports = cwd => () => src('server/styles/index.scss', { cwd })
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([
    autoprefixer({
      browsers: [
        '>= 1%',
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
  ]))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('dist', { cwd }));
