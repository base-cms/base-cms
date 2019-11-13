const express = require('express');
const path = require('path');
const marko = require('marko/express');
const apollo = require('./apollo');
const CoreConfig = require('../config/core');
const CustomConfig = require('../config/custom');
const { version } = require('../package.json');
const admin = require('../admin');
const templateRouter = require('./template-router');

/**
 * graphqlUri
 * tenantKey
 * version
 * coreConfig
 * customConfig
 * onAsyncBlockError
 * publicPath
 */
module.exports = (config = {}) => {
  const {
    rootDir,
    publicPath,
    sitePackage,
    templates,
  } = config;
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
    res.set('x-version', `${sitePackage.version}|${version}`);
    next();
  });

  // Register apollo.
  app.use(apollo({
    uri: config.graphqlUri,
    name: sitePackage.name,
    tenantKey: config.tenantKey,
  }));

  // Register the Marko middleware.
  app.use(marko());

  // Register public folder, if applicable.
  if (publicPath) {
    app.use(express.static(path.join(rootDir, publicPath)));
  }

  // Register newsletter "admin application."
  app.use('/', admin({ templates }));

  // Register templates
  app.use('/templates', templateRouter({ templates }));

  return app;
};
