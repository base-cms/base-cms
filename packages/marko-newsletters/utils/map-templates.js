const { getAsArray } = require('@base-cms/object-path');
const gql = require('graphql-tag');

const query = gql`

query MarkoNewslettersList($campaignsBefore: Date, $campaignsAfter: Date) {
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
        campaigns(input: {
          scheduledBefore: $campaignsBefore
          scheduledAfter: $campaignsAfter
          pagination: { limit: 100 }
        }) {
          edges {
            node {
              id
              name
              deploymentDate
              scheduled
            }
          }
        }
      }
    }
  }
}

`;

module.exports = async (apollo, { templates }) => {
  const campaignsBefore = Date.now();
  const campaignsAfter = campaignsBefore - (365 * 24 * 60 * 60 * 1000); // less one year
  const variables = { campaignsBefore, campaignsAfter };
  const { data } = await apollo.query({ query, variables });

  const newsletters = getAsArray(data, 'emailNewsletters.edges').map((edge) => {
    const node = { ...edge.node };
    node.templates = templates.filter(t => t.alias === node.alias).map(t => t.key);
    node.campaigns = getAsArray(node, 'campaigns.edges').map(campaignEdge => ({ ...campaignEdge.node }));
    [node.latestCampaign] = node.campaigns;
    return node;
  });

  const aliases = newsletters.map(n => n.alias);
  const staticTemplates = templates.filter(t => !aliases.includes(t.alias)).map(t => t.key);

  newsletters.forEach((newsletter) => {
    if (!newsletter.site) throw new Error(`No site ID is assigned to ${newsletter.name} (${newsletter.id})`);
  });

  return { newsletters, staticTemplates };
};
