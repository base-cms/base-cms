const { HttpLink } = require('apollo-link-http');
const { ApolloLink } = require('apollo-link');
const { setContext } = require('apollo-link-context');
const fetch = require('isomorphic-unfetch');
const env = require('./env');

const {
  BASE4_GRAPHQL_URL,
  BASE4_TENANT_KEY,
  BASE4_API_TOKEN,
  BASE4_CONTENT_CANONICAL_PATHS,
} = env;

module.exports = ApolloLink.from([
  /**
   *
   */
  setContext(() => ({
    headers: {
      authorization: `Bearer ${BASE4_API_TOKEN}`,
      'x-tenant-key': BASE4_TENANT_KEY,
      'x-content-canonical-paths': BASE4_CONTENT_CANONICAL_PATHS.join(','),
    },
  })),

  /**
   *
   */
  new HttpLink({
    uri: BASE4_GRAPHQL_URL,
    fetch,
  }),
]);
