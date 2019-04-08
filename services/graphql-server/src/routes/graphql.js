const { ApolloServer } = require('apollo-server-express');
const { Router } = require('express');
const { camelize } = require('@base-cms/inflector');
const { isObject } = require('@base-cms/utils');
const { util: canonical } = require('@base-cms/canonical-path');
const basedb = require('../basedb');
const createLoaders = require('../dataloaders');
const schema = require('../graphql/schema');
const { NODE_ENV, GRAPHQL_ENDPOINT } = require('../env');

const isProduction = NODE_ENV === 'production';

const { keys } = Object;
const router = Router();

const canonicalRules = (req) => {
  const headerPrefix = 'x-canonical';
  return ['content', 'website-section', 'dynamic-page'].reduce((o, type) => ({
    ...o,
    [camelize(type)]: {
      prefix: req.get(`${headerPrefix}-${type}-prefix`) || '',
      parts: canonical.parseHeaderFor(type, req.get(`${headerPrefix}-${type}-parts`)),
    },
  }), {});
};

const server = new ApolloServer({
  schema,
  playground: !isProduction ? { endpoint: GRAPHQL_ENDPOINT } : false,
  introspection: true,
  context: ({ req }) => {
    const loaders = createLoaders(basedb);
    return {
      basedb,
      load: async (loader, id, projection, criteria = {}) => {
        if (!loaders[loader]) throw new Error(`No dataloader found for '${loader}'`);

        const query = isObject(criteria) ? criteria : {};
        const queryKeys = keys(query);
        const sortedQuery = queryKeys.sort().reduce((o, key) => ({ ...o, [key]: query[key] }), {});

        const fieldKeys = isObject(projection) ? keys({ ...projection, _id: 1 }) : [];
        // Need to also project by any query fields.
        const sortedFields = fieldKeys.concat(queryKeys).sort();

        return loaders[loader].load([
          id,
          sortedFields.length ? sortedFields : null,
          queryKeys.length ? sortedQuery : null,
        ]);
      },
      canonicalRules: canonicalRules(req),
      imageHost: 'base.imgix.net',
    };
  },
});
server.applyMiddleware({ app: router, path: GRAPHQL_ENDPOINT });

module.exports = router;
