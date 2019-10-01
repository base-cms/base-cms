const log = require('fancy-log');
const { watch, parallel } = require('gulp');
const {
  cyan,
  green,
  red,
} = require('chalk');
const lint = require('./lint');
const server = require('./server');

module.exports = (cwd, serverFile) => () => {
  const watcher = watch(
    [
      '**/*.js',
      '**/*.json',
      '**/*.css',
      '**/*.marko',
    ],
    {
      cwd,
      queue: false,
      ignoreInitial: false,
      ignored: ['**/*.marko.js', 'node_modules'],
    },
    parallel(lint(cwd), server(serverFile)),
  );
  watcher.on('add', path => log(`File ${green(path)} was ${green('added')}`));
  watcher.on('change', path => log(`File ${green(path)} was ${cyan('changed')}`));
  watcher.on('unlink', path => log(`File ${green(path)} was ${red('removed')}.`));
};
