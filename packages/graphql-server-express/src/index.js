const app = require('./app');
const base = require('./base');
const { BASECMS_GRAPHQL_PORT: PORT, BASECMS_GRAPHQL_HOST: HOST } = require('./env');
const pkg = require('../package.json');

const { log } = console;

const run = async () => {
  log(`Starting '${pkg.name}'...`);
  const db = await base.connect();
  log(`BaseCMS DB connected to ${db.s.url}`);
  const server = await app(PORT, HOST);

  log(`> Ready on on http://${HOST}:${PORT}`);

  const graceful = () => {
    log(`Stopping '${pkg.name}'...`);
    server.stop(() => {
      log('Web server stopped.');
      db.close().then(() => {
        log('BaseCMS DB closed.');
        log('> Stopped');
        process.exit();
      }).catch(e => setImmediate(() => { throw e; }));
    });
  };

  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);
};

run().catch(e => setImmediate(() => { throw e; }));
