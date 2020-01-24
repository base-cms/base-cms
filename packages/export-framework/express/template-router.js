const { Router } = require('express');
const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const createError = require('http-errors');
const cleanResponse = require('@base-cms/marko-core/middleware/clean-marko-response');
const { getAsArray } = require('@base-cms/object-path');
const websiteFactory = require('../utils/website-factory');
const outputHeaders = require('./output-headers');
const outputFormat = require('./output-format');

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

module.exports = ({ exports }) => {
  const router = Router();

  router.use(cleanResponse());

  exports.forEach(({
    route,
    fn,
    format,
    site,
    name,
  }) => {
    router.get(route, outputHeaders({ format, name }), asyncRoute(async (req, res) => {
      const { apollo } = res.locals;
      const { data } = await apollo.query({ query, variables: { input: { status: 'active' } } });
      const sites = getAsArray(data, 'websiteSites.edges').map(({ node }) => node);
      if (site) {
        const found = sites.find(({ host }) => host === site);
        if (!found || (found && found.status !== 1)) {
          throw createError(404, `No site found for host '${site}'`);
        }
        const website = websiteFactory(found);

        // Set website context.
        res.locals.website = website;
        res.setHeader('x-site', `${website.get('name')} [${website.get('id')}]`);
      }

      const context = { apollo, req };
      try {
        const body = await fn(context);
        res.send(outputFormat(body, format));
      } catch (e) {
        throw createError(500, e.message);
      }
    }));
  });
  return router;
};
