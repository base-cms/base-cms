const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const { client: graphql, router } = require('./graphql');
const env = require('./env');

const { LOCAL_GRAPHQL_ENDPOINT } = env;

module.exports = {
  env,
  graphql,
  express: (opts = {}) => express()
    .use(helmet(opts.helmet))
    .use(compression(opts.compression))
    .use(LOCAL_GRAPHQL_ENDPOINT, router(opts.graphql)),
};
