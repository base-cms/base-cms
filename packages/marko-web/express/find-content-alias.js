const gql = require('graphql-tag');
const { get } = require('@base-cms/object-path');
const buildContentInput = require('../utils/build-content-input');

const query = gql`

query WebsiteContentPageAlias($input: ContentAliasQueryInput!) {
  contentAlias(input: $input) {
    id
    siteContext {
      path
    }
  }
}

`;

module.exports = async ({ req }) => {
  const { apollo, path } = req;
  if (!path) return null;
  const alias = path.replace(/\/+$/, '').replace(/^\/+/, '');
  if (!alias) return null;

  const input = buildContentInput({ req });
  input.alias = alias;
  const variables = { input };
  const { data } = await apollo.query({ query, variables });
  if (!data || !data.contentAlias) return null;
  return get(data, 'contentAlias.siteContext.path');
};
