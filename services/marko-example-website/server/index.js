const { startServer } = require('@base-cms/marko-web');
const path = require('path');
const routes = require('./routes');
const siteConfig = require('../config/site');

const { GRAPHQL_URI, INTERNAL_PORT, EXTERNAL_PORT } = require('./env');

process.on('unhandledRejection', (e) => { throw e; });

/**
 * Core configuration with preset properties.
 * This is different than the "free-form" site comfig.
 * @todo Move this and create a config with defaults.
 */
const coreConfig = {
  siteName: 'Evaluation Engineering',
  locale: 'en_US',
};

startServer({
  rootDir: path.resolve(__dirname, '../'),
  coreConfig,
  siteConfig,
  routes,
  graphqlUri: GRAPHQL_URI,
  port: INTERNAL_PORT,
}).then(() => {
  if (process.send) process.send({ event: 'ready', location: `http://0.0.0.0:${EXTERNAL_PORT}` });
}).catch(e => setImmediate(() => { throw e; }));
