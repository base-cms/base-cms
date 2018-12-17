const { HttpLink } = require('apollo-link-http');
const { ApolloLink } = require('apollo-link');
const { setContext } = require('apollo-link-context');
const fetch = require('isomorphic-unfetch');
const env = require('./env');

const {
  GRAPHQL_URL,
  CONTENT_CANONICAL_PATHS,
} = env;

module.exports = ApolloLink.from([
  /**
   *
   */
  setContext(() => ({
    headers: {
      'x-content-canonical-paths': CONTENT_CANONICAL_PATHS.join(','),
    },
  })),

  /**
   *
   */
  new HttpLink({
    uri: GRAPHQL_URL,
    fetch,
  }),
]);
