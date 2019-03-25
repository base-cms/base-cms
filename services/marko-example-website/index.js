const { startServer } = require('@base-cms/marko-web');
const errorTemplate = require('./server/templates/error');
const routes = require('./server/routes');
const coreConfig = require('./config/core');
const siteConfig = require('./config/site');

startServer({
  rootDir: __dirname,
  coreConfig,
  siteConfig,
  routes,
  errorTemplate,
});
