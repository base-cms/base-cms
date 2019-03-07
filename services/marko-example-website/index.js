const { startServer } = require('@base-cms/marko-web');
const routes = require('./server/routes');
const siteConfig = require('./config/site');

/**
 * Core configuration with preset properties.
 * This is different than the "free-form" site config.
 * @todo Move this and create a config with defaults.
 */
const coreConfig = {
  siteName: 'Evaluation Engineering',
  locale: 'en_US',
};

startServer({
  rootDir: __dirname,
  coreConfig,
  siteConfig,
  routes,
  graphqlUri: 'https://ee.ebm.base-cms.io/graphql',
  port: 80,
  exposedPort: 10007,
  liveReloadPort: 10008,
});
