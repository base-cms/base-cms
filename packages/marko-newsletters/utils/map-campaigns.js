const { getAsArray } = require('@base-cms/object-path');
const gql = require('graphql-tag');

const query = gql`

query MarkoCampaignsList {
  getCampaigns(input: { sort: { field: deploymentDate, order: desc }, pagination: { limit: 200 } }) {
    edges {
      node {
        _id
        deploymentDate
        name
        scheduled
      }
    }
  }
}

`;

module.exports = async (apollo, { campaigns }) => {
  const { data } = await apollo.query({ query });
  const campaignList = getAsArray(data, 'getCampaigns.edges').map((edge) => {
    const node = { ...edge.node };
    node.campaigns = campaigns.filter(c => c.name === node.name).map(c => c.key);
    return node;
  });

  if (!campaignList) throw new Error('No campaign list');
  if (campaignList === {} || []) throw new Error('No campaigns for this newsletter');
  if (!campaigns) throw new Error('No campaigns');

  return campaignList;
};
