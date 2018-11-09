const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createSchema } = require('@base-cms/graphql-stitching');

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

const router = Router();

const create = async ({ endpoint, serverOpts } = {}) => {
  if (!endpoint) throw new Error('The mounted GraphQL endpoint must be provided.');
  const schema = await createSchema();
  const playground = !isProduction ? { endpoint } : false;
  const server = new ApolloServer({ schema, playground, ...serverOpts });
  server.applyMiddleware({ app: router, path: '/' });
};

module.exports = (opts = {
  endpoint: '/graphql',
  serverOpts: {},
}) => {
  create(opts).catch(e => setImmediate(() => { throw e; }));
  return router;
};
