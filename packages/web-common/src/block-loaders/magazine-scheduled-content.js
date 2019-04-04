const buildQuery = require('../gql/query-factories/block-magazine-scheduled-content');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {number} params.sectionId The section ID. Required.
 * @param {number} [params.limit] The number of results to return.
 * @param {string} [params.after] The cursor to start returning results from.
 * @param {number} [params.optionId] The option ID.
 * @param {number[]} [params.excludeContentIds] An array of content IDs to exclude.
 * @param {string[]} [params.excludeContentTypes] An array of content types to exclude.
 * @param {string[]} [params.includeContentTypes] An array of content types to include.
 * @param {boolean} [params.requiresImage] Whether the content must have an image.
 * @param {boolean} [params.sectionBubbling] Whether automatic section bubbling is applied.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazineScheduledContent` query.
 */
module.exports = async (apolloClient, {
  limit,
  skip,
  after,
  issueId,
  queryFragment,
} = {}) => {
  const pagination = { limit, skip, after };
  const input = {
    pagination,
    issueId,
  };
  console.log(input);
  const query = buildQuery({ queryFragment });
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.magazineScheduledContent) return { nodes: [], pageInfo: {} };
  const { pageInfo } = data.magazineScheduledContent;
  const nodes = data.magazineScheduledContent.edges
    .map(edge => (edge && edge.node ? edge.node : null))
    .filter(c => c);
  return { nodes, pageInfo };
};
