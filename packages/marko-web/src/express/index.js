const express = require('express');
const path = require('path');
const apollo = require('./apollo');
const marko = require('./marko');
const sitemaps = require('./sitemaps');
const SiteConfig = require('../site-config');

module.exports = (config = {}) => {
  const { rootDir } = config;
  const app = express();

  const appDir = path.resolve(rootDir, 'app');

  const dirs = {
    root: rootDir,
    app: {
      root: appDir,
      styles: path.resolve(appDir, 'styles'),
      templates: path.resolve(appDir, 'templates'),
      routes: path.resolve(appDir, 'routes'),
    },
    dist: path.resolve(rootDir, 'dist'),
    public: path.resolve(rootDir, 'public'),
    config: path.resolve(rootDir, 'config'),
  };

  // Set the directories.
  app.locals.dirs = dirs;

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
  apollo(app, config.graphqlUri, config.apolloConfig);

  // Register the Marko middleware.
  marko(app, dirs, config.markoConfig);

  // Register public files.
  app.use(express.static(dirs.public));

  // Register sitemaps.
  sitemaps(app);

  return app;
};
