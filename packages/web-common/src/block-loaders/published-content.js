const buildQuery = require('../gql/query-factories/block-published-content');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {date} params.since The date to consider content published by
 * @param {number} params.sectionId The section ID.
 * @param {string[]} [params.contentTypes] An array of content types to include.
 * @param {boolean} [params.requiresImage] Whether the content must have an image.
 * @param {boolean} [params.sectionBubbling] Whether automatic section bubbling is applied.
 * @param {string} [params.sortField] The field to use for sorting results
 * @param {string} [params.sortOrder] The direction to sort results
 * @param {number} [params.limit] The number of results to return.
 * @param {number} [params.skip] The number of results to skip.
 * @param {string} [params.after] The cursor to start returning results from.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `allPublishedContent` query.
 */
module.exports = async (apolloClient, {
  limit,
  skip,
  after,

  startDate,
  startDirection,
  sortField: field,
  sortOrder: order,

  sectionId,
  contentTypes,
  requiresImage,
  sectionBubbling,

  queryFragment,
} = {}) => {
  const pagination = { limit, skip, after };
  const input = {
    pagination,
    contentTypes,
    requiresImage,
    sectionBubbling,
    sectionId,
    startDate,
    startDirection,
  };
  if (field || order) input.sort = { field, order };
  const query = buildQuery({ queryFragment });
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.allPublishedContent) return { nodes: [], pageInfo: {} };
  const { pageInfo } = data.allPublishedContent;
  const nodes = data.allPublishedContent.edges
    .map(edge => (edge && edge.node ? edge.node : null))
    .filter(c => c);
  return { nodes, pageInfo };
};
