const buildQuery = require('../gql/query-factories/block-magazine-scheduled-content');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {number} [params.limit] The number of results to return.
 * @param {number} [params.skip] The number of results to skip.
 * @param {string} [params.after] The cursor to start returning results from.
 * @param {number} [params.issueId] The issue identifier to use when finding scheduled content.
 * @param {object} [params.sort] The sort clause
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazineScheduledContent` query.
 */
module.exports = async (apolloClient, {
  limit,
  skip,
  after,
  issueId,
  sort,
  queryFragment,
  queryName,
} = {}) => {
  const pagination = { limit, skip, after };
  const input = {
    sort,
    pagination,
    issueId,
  };
  const query = buildQuery({ queryFragment, queryName });
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.magazineScheduledContent) return { nodes: [], pageInfo: {} };
  const { pageInfo } = data.magazineScheduledContent;
  const nodes = data.magazineScheduledContent.edges
    .map(edge => (edge && edge.node ? edge.node : null))
    .filter(c => c);
  return { nodes, pageInfo };
};
