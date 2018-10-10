const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const createSchema = require('./schema');
const { isProduction } = require('../env');

const router = Router();

const create = async () => {
  const schema = await createSchema();
  const playground = isProduction ? { endpoint: '/graphql' } : false;
  const server = new ApolloServer({ schema, playground });
  server.applyMiddleware({ app: router, path: '/' });
};

create().catch(e => setImmediate(() => {
  throw e;
}));

module.exports = router;
