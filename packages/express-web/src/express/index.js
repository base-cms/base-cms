const express = require('express');
const apollo = require('./apollo');
const engine = require('./engine');

module.exports = (config = {}) => {
  const app = express();
  // Register apollo.
  apollo(app, config.graphqlUri, config.apolloConfig);

  // Register the HBS view engine.
  engine(app, config.siteDir, config.engineConfig);

  // Apply request origin.
  app.use((req, res, next) => {
    res.locals.requestOrigin = `${req.protocol}://${req.get('host')}`;
    next();
  });

  return app;
};
