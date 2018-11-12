const app = require('./app');
const { BASECMS_GRAPHQL_PORT: PORT, BASECMS_GRAPHQL_HOST: HOST } = require('./env');
const pkg = require('../package.json');

const { log } = console;

const run = async () => {
  log(`Starting '${pkg.name}'...`);
  const server = await app(PORT, HOST);

  log(`> Ready on on http://${HOST}:${PORT}`);

  const graceful = () => {
    log(`Stopping '${pkg.name}'...`);
    server.stop(() => {
      log('Web server stopped.');
      log('> Stopped');
      process.exit();
    });
  };

  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);
};

run().catch(e => setImmediate(() => { throw e; }));
