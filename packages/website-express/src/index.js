const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const graphql = require('./graphql');

module.exports = (opts = {}) => {
  const app = express();
  app.use(helmet(opts.helmet));
  app.use(compression(opts.compression));
  graphql({ app, ...opts.graphql });
  return app;
};
