const { buildRequestHeaders } = require('@base-cms/tenant-context');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const apollo = require('./apollo');
const embeddedMedia = require('./embedded-media');
const loadObject = require('./load-object');
const marko = require('./marko');
const oembed = require('./oembed');
const rss = require('./rss');
const loadMore = require('./load-more');
const sitemaps = require('./sitemaps');
const CoreConfig = require('../config/core');
const SiteConfig = require('../config/site');

module.exports = (config = {}) => {
  const { rootDir } = config;
  const distDir = path.resolve(rootDir, 'dist');
  const app = express();
  const serverDir = path.resolve(rootDir, 'server');
  const { siteName } = config.coreConfig;

  // Add async block error handler.
  app.locals.onAsyncBlockError = config.onAsyncBlockError;

  // Register global components and fragments.
  app.locals.components = loadObject(config.components);
  app.locals.fragments = loadObject(config.fragments);

  // Add cookie parsing
  app.use(cookieParser());

  // Set the core config.
  app.locals.config = new CoreConfig({ ...config.coreConfig, distDir });

  // Set the website config to the app.
  app.locals.site = new SiteConfig(config.siteConfig);

  // Apply embedded media handlers.
  embeddedMedia(app, config.embeddedMediaHandlers);

  // Apply request origin.
  app.use((req, res, next) => {
    res.locals.requestOrigin = `${req.protocol}://${req.get('host')}`;
    next();
  });

  // Register apollo.
  const headers = buildRequestHeaders(config);
  apollo(app, config.graphqlUri, { name: siteName, link: { headers } });

  // Register the Marko middleware.
  marko(app);

  // Serve static assets
  app.use('/dist/css', express.static(`${distDir}/css`, { maxAge: '2y', immutable: true }));
  app.use('/dist/js', express.static(`${distDir}/js`, { maxAge: '2y', immutable: true }));
  app.use('/dist', express.static(distDir));

  // Register public files.
  app.use(express.static(path.join(serverDir, 'public')));

  // Register load more.
  loadMore(app);

  // Register sitemaps.
  sitemaps(app, headers);

  // Register RSS Feeds.
  rss(app, headers);

  // Register oEmbed
  oembed(app);

  return app;
};
