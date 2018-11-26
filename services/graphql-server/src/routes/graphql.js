const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const { MongoDB } = require('@base-cms/db');
const schema = require('../graphql/schema');
const createLoaders = require('../dataloaders');
const { NODE_ENV, ENABLE_MONGO_LOGGING } = require('../env');

const { Logger } = MongoDB;
const isProduction = NODE_ENV === 'production';

const router = Router();

const getCanonicalPaths = (req) => {
  const header = req.get('x-content-canonical-paths');
  if (!header) return ['sectionAlias', 'type', 'id', 'slug'];
  return header.split(',');
};

const server = new ApolloServer({
  schema,
  playground: !isProduction ? { endpoint: '/graphql' } : false,
  introspection: true,
  context: ({ req }) => {
    if (ENABLE_MONGO_LOGGING) {
      const { log } = console;
      let logCount = 0;
      Logger.setCurrentLogger((msg) => {
        logCount += 1;
        log(`MONGO DB REQUEST ${logCount}: ${msg}\n`);
      });
      Logger.setLevel('debug');
      Logger.filter('class', ['Cursor']);
    }
    return {
      loaders: createLoaders(),
      contentPaths: getCanonicalPaths(req),
    };
  },
});
server.applyMiddleware({ app: router, path: '/' });

module.exports = router;
