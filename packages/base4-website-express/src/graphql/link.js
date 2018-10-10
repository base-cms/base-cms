const { HttpLink } = require('apollo-link-http');
const { ApolloLink } = require('apollo-link');
const { setContext } = require('apollo-link-context');
const fetch = require('isomorphic-unfetch');
const env = require('../env');

const { BASE4_GRAPHQL_URL, BASE4_TENANT_KEY, BASE4_API_TOKEN } = env;

module.exports = ApolloLink.from([
  /**
   *
   */
  setContext(() => ({
    headers: {
      authorization: `Bearer ${BASE4_API_TOKEN}`,
      'x-tenant-key': BASE4_TENANT_KEY,
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
