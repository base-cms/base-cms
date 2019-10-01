const { asyncRoute } = require('@base-cms/utils');
const { getAsArray } = require('@base-cms/object-path');
const gql = require('graphql-tag');
const template = require('../templates/index');

const query = gql`

query MarkoNewsletterList {
  emailNewsletters(input: { sort: { field: name, order: asc }, pagination: { limit: 200 } }) {
    edges {
      node {
        id
        name
        alias
      }
    }
  }
}

`;

module.exports = (router, { templates }) => {
  router.get('/', asyncRoute(async (req, res) => {
    const { apollo } = res.locals;

    const { data } = await apollo.query({ query });
    const newsletters = getAsArray(data, 'emailNewsletters.edges').map((edge) => {
      const node = { ...edge.node };
      node.templates = templates.filter(t => t.alias === node.alias).map(t => t.key);
      return node;
    });

    const aliases = newsletters.map(n => n.alias);
    const staticTemplates = templates.filter(t => !aliases.includes(t.alias)).map(t => t.key);
    res.marko(template, { newsletters, staticTemplates });
  }));
};
