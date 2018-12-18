const { ApolloServer } = require('apollo-server-express');
const stitch = require('@base-cms/graphql-stitching');

const { NODE_ENV } = process.env;
const DEV = NODE_ENV === 'development';

/**
 * @param {object} params
 * @param {object} params.app The express app instance.
 * @param {string} params.uri The remote BaseCMS GraphQL URI. Required.
 * @param {string[]} params.contentCanonicalPaths The content canonical paths. Optional.
 * @param {string} [params.endpoint=/graphql] The local endpoint to mount to. Defaults to `/graphql`
 * @param {object} params.serverOpts Options to pass the the `ApolloServer` instance.
 */
module.exports = async ({
  app,
  uri,
  endpoint = '/graphql',
  contentCanonicalPaths,
  serverOpts = {},
} = {}) => {
  try {
    if (!app || typeof app.use !== 'function') throw new Error('The Express app must be provided.');
    if (!endpoint) throw new Error('A local GraphQL endpoint must be provided.');
    const { schema } = await stitch({ uri, contentCanonicalPaths });
    const server = new ApolloServer({ schema, playground: DEV, ...serverOpts });
    server.applyMiddleware({ app, path: endpoint });
  } catch (e) {
    setImmediate(() => { throw e; });
  }
};
