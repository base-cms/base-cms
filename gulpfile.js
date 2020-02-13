const {
  task,
  watch,
  src,
  parallel,
} = require('gulp');
const eslint = require('gulp-eslint');
const cache = require('gulp-cached');
const { spawn } = require('child_process');

const { log } = console;

// Common gulpfile factory. Should be used by individual packages.

module.exports = ({
  entry,
  watchPaths,
  lintPaths,
} = {}) => {
  let node;

  const serve = async () => {
    if (node) node.kill();
    node = await spawn('node', [entry], { stdio: 'inherit' });
    node.on('close', (code, signal) => {
      const exited = [];
      if (code) exited.push(`code ${(code)}`);
      if (signal) exited.push(`signal ${(signal)}`);
      log(`Process ${('exited')} with ${exited.join(' ')}`);
    });
  };

  const lint = () => src(lintPaths)
    .pipe(cache('lint'))
    .pipe(eslint())
    .pipe(eslint.format());

  task('default', () => {
    watch(
      watchPaths,
      { queue: false, ignoreInitial: false },
      parallel([serve, lint]),
    );
  });
};
