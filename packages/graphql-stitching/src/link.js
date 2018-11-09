const { HttpLink } = require('apollo-link-http');
const { ApolloLink } = require('apollo-link');
const { setContext } = require('apollo-link-context');
const fetch = require('isomorphic-unfetch');
const env = require('./env');

const {
  BASECMS_GRAPHQL_URL,
  BASECMS_TENANT_KEY,
  BASECMS_API_TOKEN,
  BASECMS_CONTENT_CANONICAL_PATHS,
} = env;

module.exports = ApolloLink.from([
  /**
   *
   */
  setContext(() => ({
    headers: {
      authorization: `Bearer ${BASECMS_API_TOKEN}`,
      'x-tenant-key': BASECMS_TENANT_KEY,
      'x-content-canonical-paths': BASECMS_CONTENT_CANONICAL_PATHS.join(','),
    },
  })),

  /**
   *
   */
  new HttpLink({
    uri: BASECMS_GRAPHQL_URL,
    fetch,
  }),
]);
