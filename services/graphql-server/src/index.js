const basedb = require('./basedb');
const app = require('./app');
const pkg = require('../package.json');

const { log } = console;

const run = async () => {
  log(`Starting '${pkg.name}'...`);

  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const server = await app(80);
  log('> Ready on http://0.0.0.0:10002/graphql');

  const graceful = () => {
    log(`Stopping '${pkg.name}'...`);
    server.stop(() => {
      log('Web server stopped.');
      client.close().then(() => log('> Stopped'));
    });
  };

  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);
};

run().catch(e => setImmediate(() => { throw e; }));
