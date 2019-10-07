const gql = require('graphql-tag');

const query = gql`

query MarkoWebsiteContext {
  websiteContext {
    id
    name
    description
    host
    origin
    imageHost
    assetHost
    date {
      timezone
      format
      locale
    }
    language {
      code
      primaryCode
      subCode
    }
  }
}

`;

/**
 * @param {ApolloClient} apolloClient The BaseCMS Apollo GraphQL client that will perform the query.
 */
module.exports = async (apolloClient) => {
  const { data } = await apolloClient.query({ query });
  return data.websiteContext;
};
