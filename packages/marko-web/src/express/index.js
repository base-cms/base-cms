const express = require('express');
const path = require('path');
const apollo = require('./apollo');
const marko = require('./marko');
const sitemaps = require('./sitemaps');
const SiteConfig = require('../site-config');

module.exports = (config = {}) => {
  const { rootDir } = config;
  const app = express();
  const serverDir = path.resolve(rootDir, 'server');

  // Set the core config.
  // @todo Create a class with default values when not set.
  // @todo Determine the differences between core and site configs.
  app.locals.config = config.coreConfig;

  // Set the website config to the app.
  app.locals.site = new SiteConfig(config.siteConfig);

  // Apply request origin.
  app.use((req, res, next) => {
    res.locals.requestOrigin = `${req.protocol}://${req.get('host')}`;
    next();
  });

  // Register apollo.
  apollo(app, config.graphqlUri);

  // Register the Marko middleware.
  marko(app);

  // Serve static assets
  app.use('/dist', express.static(path.resolve(rootDir, 'dist')));

  // Register public files.
  app.use(express.static(path.join(serverDir, 'public')));

  // Register sitemaps.
  sitemaps(app);

  return app;
};
