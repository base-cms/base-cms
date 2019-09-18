const buildQuery = require('../gql/query-factories/block-dynamic-page');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} params.alias The page alias to query.
 * @param {string} [params.queryName] An optional name to append to the query.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `contentPage` query.
 */
module.exports = async (apolloClient, {
  alias,
  queryName,
  queryFragment,
} = {}) => {
  const query = buildQuery({ queryFragment, queryName });
  const input = { alias };
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.contentPage) return { node: null };
  return { node: data.contentPage };
};
