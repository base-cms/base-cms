const http = require('http');
const { createTerminus } = require('@godaddy/terminus');
const { isFunction: isFn } = require('@base-cms/utils');
const express = require('./express');

if (!process.env.LIVERELOAD_PORT) {
  process.env.LIVERELOAD_PORT = 4010;
}
const { env } = process;


// @todo Perhaps this should be configured...
process.on('unhandledRejection', (e) => { throw e; });

const startServer = async ({
  rootDir,
  siteConfig,
  coreConfig,
  port = env.PORT || 4008,
  exposedPort = env.EXPOSED_PORT || env.PORT || 4008,
  routes,
  graphqlUri,

  // Terminus settings.
  timeout = 1000,
  signals = ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'],
  healthCheckPath = '/_health',
  onSignal,
  onShutdown,
  onStart,
  onHealthCheck,
} = {}) => {
  if (!rootDir) throw new Error('The root project directory is required.');
  const app = express({
    rootDir,
    siteConfig,
    coreConfig,
    graphqlUri,
  });

  // Load website routes.
  if (!isFn(routes)) throw new Error('A routes function is required.');
  routes(app);

  // Await required services here...
  if (isFn(onStart)) await onStart(app);

  const server = http.createServer(app);

  createTerminus(server, {
    timeout,
    signals,
    // Add health checks of services here...
    healthChecks: {
      [healthCheckPath]: async () => {
        if (isFn(onHealthCheck)) return onHealthCheck();
        return { ping: 'pong' };
      },
    },
    onSignal: async () => {
      // Stop required services here...
      if (isFn(onSignal)) await onSignal();
    },
    onShutdown: async () => {
      if (isFn(onShutdown)) await onShutdown();
    },
  });

  return new Promise((res, rej) => {
    server.listen(port, function listen(err) {
      if (err) {
        rej(err);
      } else {
        res(this);
        if (process.send) {
          process.send({ event: 'ready', location: `http://0.0.0.0:${exposedPort}` });
        }
      }
    });
  }).catch(e => setImmediate(() => { throw e; }));
};

module.exports = {
  startServer,
};
