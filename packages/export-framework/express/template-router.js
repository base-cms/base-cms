const { Router } = require('express');
const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const createError = require('http-errors');
const cleanResponse = require('@base-cms/marko-core/middleware/clean-marko-response');
const { getAsArray } = require('@base-cms/object-path');
const websiteFactory = require('../utils/website-factory');
const outputHeaders = require('./output-headers');

const { error } = console;
const query = gql`

query AllSites($input: WebsiteSitesQueryInput!) {
  websiteSites(input: $input) {
    edges {
      node {
        id
        name
        host
        status
      }
    }
  }
}
`;

module.exports = ({ exports, coreConfig, customConfig }) => {
  const router = Router();

  router.use(cleanResponse());

  exports.forEach(({
    route,
    fn,
    format,
    site,
    name,
  }) => {
    router.get(route, outputHeaders({ coreConfig, format, name }), asyncRoute(async (req, res) => {
      const { apollo } = res.locals;
      const { data } = await apollo.query({ query, variables: { input: { status: 'active' } } });
      const sites = getAsArray(data, 'websiteSites.edges').map(({ node }) => node);

      const context = {
        apollo,
        req,
        coreConfig,
        customConfig,
      };

      if (site) {
        const found = sites.find(({ host }) => host === site);
        if (!found || (found && found.status !== 1)) {
          throw createError(404, `No site found for host '${site}'`);
        }
        const website = websiteFactory(found);

        // Set website context.
        res.setHeader('x-site', `${website.get('name')} [${website.get('id')}]`);
        context.site = website;
      }

      try {
        const body = await fn(context);
        res.send(body);
      } catch (e) {
        if (e.networkError) error(e.networkError.result);
        throw createError(500, e.message);
      }
    }));
  });
  return router;
};
