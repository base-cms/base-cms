const buildQuery = require('../gql/query-factories/block-magazine-active-issues');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazineActiveIssues` query.
 */
module.exports = async (apolloClient, { id, queryFragment, limit } = {}) => {
  const query = buildQuery({ queryFragment });
  const sort = { field: 'mailDate', order: 'desc' };
  const pagination = { limit };
  const variables = { input: { id, sort, pagination } };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.magazineActiveIssues) return { nodes: [], pageInfo: {} };
  const { pageInfo } = data.magazineActiveIssues;
  const nodes = data.magazineActiveIssues.edges
    .map(edge => (edge && edge.node ? edge.node : null))
    .filter(c => c);
  return { nodes, pageInfo };
};
