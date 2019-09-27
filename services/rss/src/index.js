const http = require('http');
const { createTerminus } = require('@godaddy/terminus');
require('./newrelic');
const { GRAPHQL_URI, PORT, EXPOSED_PORT } = require('./env');
const app = require('./app');
const pkg = require('../package.json');
const { log } = require('./output');

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

  server.listen(PORT, () => log(`> Ready on http://0.0.0.0:${EXPOSED_PORT}, using GraphQL API ${GRAPHQL_URI}`));
};

// Simulate future NodeJS behavior by throwing unhandled Promise rejections.
process.on('unhandledRejection', (e) => {
  log('> Unhandled promise rejection. Throwing error...');
  throw e;
});

log(`> Booting ${pkg.name} v${pkg.version}...`);
run().catch(e => setImmediate(() => { throw e; }));
