const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const createSchema = require('./schema');
const { isProduction, LOCAL_GRAPHQL_ENDPOINT } = require('../env');

const router = Router();

const create = async (opts) => {
  const schema = await createSchema();
  const playground = isProduction ? { endpoint: LOCAL_GRAPHQL_ENDPOINT } : false;
  const server = new ApolloServer({ schema, playground, ...opts });
  server.applyMiddleware({ app: router, path: '/' });
};

module.exports = (opts = {}) => {
  create(opts).catch(e => setImmediate(() => { throw e; }));
  return router;
};
