const gql = require('graphql-tag');
const siteFragment = require('./graphql/website-context-fragment');

const query = gql`

query MarkoWebsiteContext {
  websiteContext {
    ...MarkoWebsiteContextFragment
  }
}

${siteFragment}

`;

/**
 * @param {ApolloClient} apolloClient The BaseCMS Apollo GraphQL client that will perform the query.
 */
module.exports = async (apolloClient) => {
  const { data } = await apolloClient.query({ query });
  return data.websiteContext;
};
