const { ApolloServer } = require('apollo-server-express');
const { get } = require('@base-cms/object-path');
const { getFromRequest } = require('@base-cms/tenant-context');
const { Router } = require('express');
const { isObject } = require('@base-cms/utils');
const { MongoDB } = require('@base-cms/db');
const { requestParser: canonicalRules } = require('@base-cms/canonical-path');
const ApolloNewrelicExtension = require('apollo-newrelic-extension');
const newrelic = require('../newrelic');
const basedbFactory = require('../basedb');
const createLoaders = require('../dataloaders');
const schema = require('../graphql/schema');
const websiteContext = require('../graphql/utils/website-context');
const { NODE_ENV, GRAPHQL_ENDPOINT, ENGINE_API_KEY } = require('../env');

const isProduction = NODE_ENV === 'production';

const { ObjectID } = MongoDB;
const { keys } = Object;
const router = Router();

const config = {
  // Enable in production
  tracing: isProduction,
  cacheControl: isProduction,
  extensions: isProduction ? [() => new ApolloNewrelicExtension()] : [],
  engine: isProduction ? { apiKey: ENGINE_API_KEY } : false,
  introspection: true,
  // Enable in dev
  debug: !isProduction,
  playground: !isProduction ? { endpoint: GRAPHQL_ENDPOINT } : false,
};

const loadSite = async ({ basedb, siteId, tenant }) => {
  const site = await basedb.findOne('platform.Product', {
    status: 1,
    type: 'Site',
    _id: new ObjectID(siteId),
  }, { projection: { _id: 1, name: 1, url: 1 } });
  if (!site) throw new Error(`No site was found for tenant '${tenant}' using ID '${siteId}'`);
  if (!site.url) throw new Error(`No site url is set for tenant '${tenant}' using ID '${siteId}'`);
  return websiteContext(site);
};

const server = new ApolloServer({
  schema,
  ...config,
  context: async ({ req }) => {
    // @todo Should the siteId be required?
    const {
      tenant,
      siteId,
      imageHost,
      assetHost,
    } = getFromRequest(req);
    const basedb = basedbFactory(tenant);
    const loaders = createLoaders(basedb);

    // If this becomes optional, an empty, faux object should be returned instead.
    const site = await loadSite({ siteId, basedb, tenant });

    return {
      basedb,
      site,
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
