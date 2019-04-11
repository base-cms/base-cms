const createError = require('http-errors');
const buildQuery = require('../gql/query-factories/with-magazine-issue');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} params.id The magazine issue id to query.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazineIssue` query.
 * @param {object} [params.additionalInput] Additional query input params.
 */
module.exports = async (apolloClient, {
  id,
  queryFragment,
  additionalInput,
} = {}) => {
  if (!id) {
    // No magazine id was provided. Return a 400.
    throw createError(400, 'No magazine issue id was provided.');
  }

  // Query for the magazine issue using the id.
  const input = { ...additionalInput, id };
  const variables = { input };
  const { data } = await apolloClient.query({ query: buildQuery({ queryFragment }), variables });

  const { magazineIssue: issue } = data;

  if (issue && issue.id) {
    // The magazine issue was found.
    return issue;
  }
  // No magazine issue was found for this id. Return a 404.
  throw createError(404, `No magazine issue was found for id '${id}'`);
};
