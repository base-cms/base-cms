const livereload = require('gulp-livereload');
const log = require('fancy-log');
const { watch, series, parallel } = require('gulp');
const {
  cyan,
  green,
  magenta,
  red,
} = require('chalk');
const build = require('./build');
const lint = require('./lint');
const server = require('./server');

// @todo Fix this!
const LIVERELOAD_PORT = 34567;

module.exports = (cwd, serverFile) => () => {
  livereload.listen({ port: LIVERELOAD_PORT, quiet: true });
  log(`Livereload ${green('listening')} on port ${magenta(LIVERELOAD_PORT)}`);
  const watcher = watch(
    ['server.js', 'config/**/*.js', 'server/**/*.js', 'server/styles/**/*.scss', 'server/**/*.marko'],
    {
      cwd,
      queue: false,
      ignoreInitial: false,
      ignored: 'server/**/*.marko.js',
    },
    parallel(lint(cwd), series(build(cwd), server(serverFile))),
  );
  watcher.on('add', path => log(`File ${green(path)} was ${green('added')}`));
  watcher.on('change', path => log(`File ${green(path)} was ${cyan('changed')}`));
  watcher.on('unlink', path => log(`File ${green(path)} was ${red('removed')}.`));
};
