const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const base4router = require('@base-cms/base4-graphql-express-router');
const env = require('./env');

const { LOCAL_GRAPHQL_ENDPOINT } = env;

module.exports = (opts = {}) => express()
  .use(helmet(opts.helmet))
  .use(compression(opts.compression))
  .use(LOCAL_GRAPHQL_ENDPOINT, base4router({ endpoint: LOCAL_GRAPHQL_ENDPOINT }));
