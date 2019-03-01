const { startServer } = require('@base-cms/marko-web');
const routes = require('../app/routes');
const siteConfig = require('../config/site');

const { GRAPHQL_URI, INTERNAL_PORT, EXTERNAL_PORT } = require('./env');
const pkg = require('../package.json');

const { log } = console;

process.on('unhandledRejection', (e) => {
  log('> Unhandled promise rejection. Throwing error...');
  throw e;
});

log(`> Booting ${pkg.name} v${pkg.version}...`);
startServer({
  siteConfig,
  routes,
  graphqlUri: GRAPHQL_URI,
  port: INTERNAL_PORT,
}).then(() => {
  log(`> Ready on http://0.0.0.0:${EXTERNAL_PORT}`);
  if (process.send) process.send('online');
}).catch(e => setImmediate(() => { throw e; }));
