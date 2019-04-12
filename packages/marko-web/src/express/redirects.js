const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');

const { log } = console;

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
  log('checking redirect', { from });
  const variables = { input: { from } };
  const { data } = await apollo.query({ query, variables });
  const { websiteRedirect } = data;
  log('redirect result', { websiteRedirect });
  if (websiteRedirect) {
    const { to, code } = websiteRedirect;
    log('redirecting', { to, code });
    res.redirect(code, to);
  }
});
