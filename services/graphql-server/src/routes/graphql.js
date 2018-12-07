const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const { MongoDB } = require('@base-cms/db');
const { isObject } = require('@base-cms/common');
const schema = require('../graphql/schema');
const basedb = require('../basedb');
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

    const loaders = createLoaders(basedb);
    return {
      basedb,
      load: async (loader, id, projection) => {
        if (!loaders[loader]) throw new Error(`No dataloader found for '${loader}'`);
        const fields = isObject(projection) ? Object.keys({ ...projection, _id: 1 }).sort() : [];
        return loaders[loader].load([id, fields.length ? fields : null]);
      },
      contentPaths: getCanonicalPaths(req),
    };
  },
});
server.applyMiddleware({ app: router, path: '/' });

module.exports = router;
