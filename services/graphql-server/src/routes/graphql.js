const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const { isObject } = require('@base-cms/common');
const schema = require('../graphql/schema');
const basedb = require('../basedb');
const createLoaders = require('../dataloaders');
const { NODE_ENV } = require('../env');

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
