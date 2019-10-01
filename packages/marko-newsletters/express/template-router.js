const { Router } = require('express');
const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const createError = require('http-errors');

const query = gql`

query WithMarkoNewsletter($input: EmailNewsletterAliasQueryInput!) {
  emailNewsletterAlias(input: $input) {
    id
    name
    alias
    description
    status
  }
}

`;


module.exports = ({ templates }) => {
  const router = Router();

  templates.forEach(({ route, template, alias }) => {
    router.get(route, asyncRoute(async (req, res) => {
      const { apollo } = res.locals;
      const input = { alias, status: 'any' };

      const { data } = await apollo.query({ query, variables: { input } });
      const { emailNewsletterAlias: newsletter } = data;

      if (newsletter && newsletter.status !== 1) throw createError(404, 'No newsletter found for the provided alias.');
      res.marko(template, { newsletter: newsletter || {}, isStatic: !newsletter });
    }));
  });
  return router;
};
