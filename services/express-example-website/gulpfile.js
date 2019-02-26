// @todo This file should eventually be used for a single repo, not the monorepo.

const {
  task,
  watch,
  src,
  parallel,
} = require('gulp');
const eslint = require('gulp-eslint');
const cache = require('gulp-cached');
const { spawn } = require('child_process');
// const http = require('http');
// const socketio = require('socket.io');

const { log } = console;

// process.env.LIVERELOAD_PATH = '/_lr';
// const { LIVERELOAD_PORT, LIVERELOAD_PATH } = process.env;
// const server = http.createServer();
// const io = socketio(server, { path: LIVERELOAD_PATH });
// server.listen(LIVERELOAD_PORT);

// io.on('connection', () => log('> Web browser connected to livereload.'));

let node;

const serve = async () => {
  if (node) node.kill();
  node = await spawn('node', ['server/index.js'], { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
  // node.on('message', (msg) => {
  //   if (msg === 'ready') io.emit('process-ready');
  // });
  node.on('close', (code, signal) => {
    log(`> Node subprocess (via Gulp) exited with code ${code} signal ${signal}`);
  });
};

// Note: if the `siteDir` is changed in `server/index.js` this also needs to be changed.
const lint = () => src(['server/**/*.js', 'site/**/*.js'])
  .pipe(cache('lint'))
  .pipe(eslint())
  .pipe(eslint.format());

task('default', () => {
  watch(
    ['server/**/*.js', 'site/**/*.js', 'site/**/*.hbs'],
    { queue: false, ignoreInitial: false },
    parallel([serve, lint]),
  );
});
