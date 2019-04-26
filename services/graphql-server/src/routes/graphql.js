const { ApolloServer } = require('apollo-server-express');
const { get } = require('@base-cms/object-path');
const { getFromRequest } = require('@base-cms/tenant-context');
const { Router } = require('express');
const { isObject } = require('@base-cms/utils');
const { requestParser: canonicalRules } = require('@base-cms/canonical-path');
const newrelic = require('../newrelic');
const basedbFactory = require('../basedb');
const createLoaders = require('../dataloaders');
const schema = require('../graphql/schema');
const { NODE_ENV, GRAPHQL_ENDPOINT, ENGINE_API_KEY } = require('../env');

const isProduction = NODE_ENV === 'production';

const { keys } = Object;
const router = Router();

const server = new ApolloServer({
  schema,
  playground: !isProduction ? { endpoint: GRAPHQL_ENDPOINT } : false,
  introspection: true,
  engine: isProduction ? { apiKey: ENGINE_API_KEY } : false,
  context: ({ req }) => {
    const { tenant, imageHost, assetHost } = getFromRequest(req);
    const basedb = basedbFactory(tenant);
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
      imageHost,
      assetHost,
    };
  },
  formatError: (e) => {
    const code = get(e, 'extensions.code');
    if (code === 'INTERNAL_SERVER_ERROR') newrelic.noticeError(e);
    return e;
  },
});
server.applyMiddleware({ app: router, path: GRAPHQL_ENDPOINT });

module.exports = router;
