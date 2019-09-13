const buildQuery = require('../gql/query-factories/block-magazine-issue');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} params.id The issue ID to query.
 * @param {string} [params.queryName] An optional name to append to the query.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazineIssue` query.
 */
module.exports = async (apolloClient, {
  id,
  queryName,
  queryFragment,
} = {}) => {
  const query = buildQuery({ queryFragment, queryName });
  const input = { id: Number(id) };
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.magazineIssue) return { node: null };
  return { node: data.magazineIssue };
};
