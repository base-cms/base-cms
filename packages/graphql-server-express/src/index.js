const broker = require('@base-cms/db-service');
const app = require('./app');
const { BASECMS_GRAPHQL_PORT: PORT, BASECMS_GRAPHQL_HOST: HOST } = require('./env');
const pkg = require('../package.json');

const { log } = console;

const run = async () => {
  log(`Starting '${pkg.name}'...`);
  await broker.start();
  await broker.waitForServices('db', 2000);
  log('Service broker started.');

  const server = await app(PORT, HOST);
  log(`> Ready on on http://${HOST}:${PORT}`);

  const graceful = () => {
    log(`Stopping '${pkg.name}'...`);
    server.stop(() => {
      log('Web server stopped.');
      // @todo The ServiceBroker internally stops the process.
      // If we want to do anything in the stop.then() it must be registered
      // as a middleware on the broker. Or something with the broker option
      // `skipProcessEventRegistration` must be done.
      broker.stop().catch(e => setImmediate(() => { throw e; }));
    });
  };

  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);
};

run().catch(e => setImmediate(() => { throw e; }));
