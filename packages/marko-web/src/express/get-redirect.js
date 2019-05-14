const gql = require('graphql-tag');

const query = gql`
  query WebsiteRedirect($input: WebsiteRedirectQueryInput!) {
    websiteRedirect(input: $input) {
      to
      code
    }
  }
`;

module.exports = async (req) => {
  const { apollo, path: from, query: params } = req;
  const variables = { input: { from, params } };
  const { data } = await apollo.query({ query, variables });
  const { websiteRedirect } = data;
  return websiteRedirect;
};
