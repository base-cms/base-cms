const { getAsArray } = require('@base-cms/object-path');
const gql = require('graphql-tag');

const query = gql`
query EmailCampaignList($input: EmailCampaignsQueryInput!) {
  emailCampaigns(input: $input) {
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
`;

module.exports = async (apollo, { productId, scheduledBefore, scheduledAfter, limit }) => {
  const variables = {
    input: {
      productId,
    },
  };
  if (scheduledBefore) variables.input.scheduledBefore = scheduledBefore;
  if (scheduledAfter) variables.input.scheduledAfter = scheduledAfter;
  if (limit) variables.input.pagination = { limit };
  const { data } = await apollo.query({ query, variables });
  if (!data || !data.emailCampaigns) return null;
  const campaings = getAsArray(data, 'emailCampaigns.edges').map((edge) => {
    const node = { ...edge.node };
    return node;
  });
  return campaings;
};
