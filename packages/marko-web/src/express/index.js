const { buildRequestHeaders } = require('@base-cms/tenant-context');
const express = require('express');
const path = require('path');
const apollo = require('./apollo');
const marko = require('./marko');
const rss = require('./rss');
const sitemaps = require('./sitemaps');
const CoreConfig = require('../config/core');
const SiteConfig = require('../config/site');

module.exports = (config = {}) => {
  const { rootDir } = config;
  const distDir = path.resolve(rootDir, 'dist');
  const app = express();
  const serverDir = path.resolve(rootDir, 'server');

  // Set the core config.
  app.locals.config = new CoreConfig({ ...config.coreConfig, distDir });

  // Set the website config to the app.
  app.locals.site = new SiteConfig(config.siteConfig);

  // Apply request origin.
  app.use((req, res, next) => {
    res.locals.requestOrigin = `${req.protocol}://${req.get('host')}`;
    next();
  });

  // Register apollo.
  const headers = buildRequestHeaders(config);
  apollo(app, config.graphqlUri, { link: { headers } });

  // Register the Marko middleware.
  marko(app);

  // Serve static assets
  app.use('/dist', express.static(distDir));

  // Register public files.
  app.use(express.static(path.join(serverDir, 'public')));

  // Register sitemaps.
  sitemaps(app);

  // Register RSS Feeds.
  rss(app);

  return app;
};
