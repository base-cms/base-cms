const { startServer } = require('@base-cms/marko-web');
const routes = require('./server/routes');
const siteConfig = require('./config/site');
const coreConfig = require('./config/core');
const document = require('./server/components/document');
const components = require('./server/components');
const fragments = require('./server/fragments');

const { log } = console;

module.exports = startServer({
  rootDir: __dirname,
  coreConfig,
  siteConfig,
  routes,
  document,
  components,
  fragments,
}).then(() => log('Website started!')).catch(e => setImmediate(() => { throw e; }));
