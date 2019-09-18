const buildQuery = require('../gql/query-factories/block-content');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} params.id The content ID to query.
 * @param {string} [params.status=any] The content status flag to query.
 * @param {string} [params.queryName] An optional name to append to the query.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `content` query.
 */
module.exports = async (apolloClient, {
  id,
  status = 'any',
  queryName,
  queryFragment,
} = {}) => {
  const query = buildQuery({ queryFragment, queryName });
  const input = { id: Number(id), status };
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.content) return { node: null };
  return { node: data.content };
};
