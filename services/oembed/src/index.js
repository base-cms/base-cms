const http = require('http');
const { createTerminus } = require('@godaddy/terminus');
const newrelic = require('./newrelic');
const app = require('./app');
const pkg = require('../package.json');

const { log } = console;

const server = http.createServer(app);

const run = async () => {
  createTerminus(server, {
    timeout: 1000,
    signals: ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'],
    healthChecks: { '/_health': () => Promise.resolve(`${pkg.name} pinged successfully.`) },
    onSignal: () => {
      log('> Cleaning up...');
    },
    onShutdown: () => log('> Cleanup finished. Shutting down.'),
  });

  server.listen(80, () => log('> Ready on http://0.0.0.0:10013'));
};

// Simulate future NodeJS behavior by throwing unhandled Promise rejections.
process.on('unhandledRejection', (e) => {
  log('> Unhandled promise rejection. Throwing error...');
  newrelic.noticeError(e);
  throw e;
});

log(`> Booting ${pkg.name} v${pkg.version}...`);
run().catch(e => setImmediate(() => {
  newrelic.noticeError(e);
  throw e;
}));
