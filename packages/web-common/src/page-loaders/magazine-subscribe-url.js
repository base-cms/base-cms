const createError = require('http-errors');
const buildQuery = require('../gql/query-factories/with-magazine-subscribe-url');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} params.subscribeUrl The magazine publication subscription url to query.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazinePublication` query.
 * @param {object} [params.additionalInput] Additional query input params.
 */
module.exports = async (apolloClient, {
  subscribeUrl,
  queryFragment,
  additionalInput,
} = {}) => {
  if (!subscribeUrl) {
    // No magazine id was provided. Return a 400.
    throw createError(400, 'No magazine subscription url was provided.');
  }

  // Query for the magazine publication using the id.
  const input = { ...additionalInput, subscribeUrl };
  const variables = { input };
  const { data } = await apolloClient.query({ query: buildQuery({ queryFragment }), variables });

  const { magazineSubscribeUrl: publication } = data;

  if (publication && publication.id) {
    // The magazine publication was found.
    return publication;
  }
  // No magazine publication was found for this id. Return a 404.
  throw createError(404, `No magazine publication was found for url '${subscribeUrl}'`);
};
