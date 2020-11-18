const { getAsArray } = require('@base-cms/object-path');
const gql = require('graphql-tag');
const getCampaigns = require('./get-campaigns');

const query = gql`

query MarkoNewslettersList {
  emailNewsletters(input: { sort: { field: name, order: asc }, pagination: { limit: 200 } }) {
    edges {
      node {
        id
        name
        description
        alias
        site {
          id
          name
        }
      }
    }
  }
}

`;

module.exports = async (apollo, { templates }) => {
  const { data } = await apollo.query({ query });
  const newsletters = await Promise.all(getAsArray(data, 'emailNewsletters.edges').map(async (edge) => {
    const node = { ...edge.node };
    const now = new Date();
    node.templates = templates.filter(t => t.alias === node.alias).map(t => t.key);
    node.campaigns = await getCampaigns(
      apollo,
      {
        productId: node.id,
        scheduledBefore: now.getTime(),
        scheduledAfter: now.getTime() - (52 * 7 * 24 * 3600000),
        limit: 365,
      },
    );
    return node;
  }));

  const aliases = newsletters.map(n => n.alias);
  const staticTemplates = templates.filter(t => !aliases.includes(t.alias)).map(t => t.key);

  newsletters.forEach((newsletter) => {
    if (!newsletter.site) throw new Error(`No site ID is assigned to ${newsletter.name} (${newsletter.id})`);
  });

  return { newsletters, staticTemplates };
};
