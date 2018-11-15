const broker = require('./broker');
const app = require('./app');
const pkg = require('../package.json');

const { log } = console;

const run = async () => {
  log(`Starting '${pkg.name}'...`);
  await broker.start();
  await broker.waitForServices('db', 2000);
  log('Service broker started.');

  const server = await app(80);
  log('> Ready on http://0.0.0.0:10003');

  const graceful = () => {
    log(`Stopping '${pkg.name}'...`);
    server.stop(() => {
      log('Web server stopped.');
      broker.stop().then(() => log('> Stopped'));
    });
  };

  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);
};

run().catch(e => setImmediate(() => { throw e; }));
