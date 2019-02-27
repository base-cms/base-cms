const express = require('express');
const apollo = require('./apollo');
const marko = require('./marko');
const SiteConfig = require('../site-config');

module.exports = (config = {}) => {
  const app = express();

  // Set the website config to the app.
  app.locals.site = new SiteConfig(config.siteConfig);

  // Register apollo.
  apollo(app, config.graphqlUri, config.apolloConfig);

  // Register the Marko middleware.
  marko(app, config.markoConfig);

  // Apply request origin.
  app.use((req, res, next) => {
    res.locals.requestOrigin = `${req.protocol}://${req.get('host')}`;
    next();
  });

  return app;
};
