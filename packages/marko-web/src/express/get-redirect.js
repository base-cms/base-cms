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
  const { apollo, path: from } = req;
  const variables = { input: { from } };
  const { data } = await apollo.query({ query, variables });
  const { websiteRedirect } = data;
  return websiteRedirect;
};
