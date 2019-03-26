const buildQuery = require('../gql/query-factories/block-related-published-content');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {number} params.contentId The content ID. Required.
 * @param {string[]} [params.queryTypes] The related query types to use (e.g. owned, invsere, etc).
 * @param {number} [params.limit] The number of results to return.
 * @param {string} [params.after] The cursor to start returning results from.
 * @param {string[]} [params.excludeContentTypes] An array of content types to exclude.
 * @param {string[]} [params.includeContentTypes] An array of content types to include.
 * @param {boolean} [params.requiresImage] Whether the content must have an image.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `relatedPublishedContent` query.
 */
module.exports = async (apolloClient, {
  limit,
  skip,
  after,

  contentId,
  queryTypes,

  excludeContentTypes,
  includeContentTypes,
  requiresImage,

  queryFragment,
} = {}) => {
  const pagination = { limit, skip, after };
  const input = {
    contentId,
    queryTypes,
    pagination,
    excludeContentTypes,
    includeContentTypes,
    requiresImage,
  };
  const query = buildQuery({ queryFragment });
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.relatedPublishedContent) return { nodes: [], pageInfo: {} };
  const { pageInfo } = data.relatedPublishedContent;
  const nodes = data.relatedPublishedContent.edges
    .map(edge => (edge && edge.node ? edge.node : null))
    .filter(c => c);
  return { nodes, pageInfo };
};
