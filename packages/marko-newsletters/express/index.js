const express = require('express');
const path = require('path');
const apollo = require('./apollo');
const marko = require('./marko');
const websiteContext = require('./website-context');
const CoreConfig = require('../config/core');
const CustomConfig = require('../config/custom');
const { version } = require('../package.json');
const admin = require('../admin');

/**
 * graphqlUri
 * tenantKey
 * siteId
 * version
 * coreConfig
 * customConfig
 * onAsyncBlockError
 * publicPath
 */
module.exports = (config = {}) => {
  const { rootDir, publicPath, templates } = config;
  const app = express();

  // Add async block error handler.
  app.locals.onAsyncBlockError = config.onAsyncBlockError;

  // Set the core config.
  app.locals.config = new CoreConfig({ ...config.coreConfig });

  // Set custom configuration.
  app.locals.site = new CustomConfig(config.customConfig);

  // Apply request origin.
  app.use((req, res, next) => {
    res.locals.requestOrigin = `${req.protocol}://${req.get('host')}`;
    next();
  });

  // Apply versions.
  app.use((req, res, next) => {
    res.set('x-version', `${config.version}|${version}`);
    next();
  });

  // Register apollo.
  app.use(apollo({
    uri: config.graphqlUri,
    tenantKey: config.tenantKey,
    siteId: config.siteId,
  }));

  // Set website context.
  app.use(websiteContext(app.locals.config));

  // Register the Marko middleware.
  marko(app);

  // Register public folder, if applicable.
  if (publicPath) {
    app.use(express.static(path.join(rootDir, publicPath)));
  }

  // Register newsletter "admin application."
  app.use('/', admin({ templates }));

  return app;
};
