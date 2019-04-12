const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');

const query = gql`
  query WebsiteRedirect($input: WebsiteRedirectQueryInput!) {
    websiteRedirect(input: $input) {
      to
      code
    }
  }
`;

module.exports = asyncRoute(async (req, res) => {
  const { apollo, path: from } = req;
  const variables = { input: { from } };
  const { data } = await apollo.query({ query, variables });
  const { websiteRedirect } = data;
  if (websiteRedirect) {
    const { to, code } = websiteRedirect;
    res.redirect(code, to);
  }
});
