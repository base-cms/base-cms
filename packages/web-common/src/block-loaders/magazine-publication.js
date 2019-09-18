const buildQuery = require('../gql/query-factories/block-magazine-publication');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} params.id The publication ID to query.
 * @param {string} [params.queryName] An optional name to append to the query.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazinePublication` query.
 */
module.exports = async (apolloClient, {
  id,
  queryName,
  queryFragment,
} = {}) => {
  const query = buildQuery({ queryFragment, queryName });
  const input = { id };
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.magazinePublication) return { node: null };
  return { node: data.magazinePublication };
};
