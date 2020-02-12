const fetch = require('node-fetch');
const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { createHttpLink } = require('apollo-link-http');

const rootConfig = {
  connectToDevTools: false,
  ssrMode: true,
};

module.exports = ({
  req,
  token,
  appId,
  config,
  linkConfig = {},
} = {}) => {
  if (!appId) throw new Error('An IdentityX application ID is required.');

  const headers = {
    ...linkConfig.headers,
    'x-app-id': appId,
    'x-forwarded-for': req.ip,
    'user-agent': req.get('user-agent'),
  };
  if (token) headers.authorization = `AppUser ${token}`;

  return new ApolloClient({
    ...config,
    ...rootConfig,
    link: createHttpLink({
      ...linkConfig,
      uri: process.env.IDENTITYX_GRAPHQL_URI || 'https://identity-x.io/graphql',
      fetch,
      headers,
    }),
    cache: new InMemoryCache(),
  });
};
