const buildQuery = require('../gql/query-factories/block-website-scheduled-content');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {number} params.sectionId The section ID.
 * @param {number} params.sectionAlias The section alias.
 *                                     A `sectionId` or `sectionAlias` is required.
 * @param {number} [params.limit] The number of results to return.
 * @param {string} [params.after] The cursor to start returning results from.
 * @param {number} [params.optionId] The option ID.
 * @param {string} [params.optionName] The option name.
 * @param {number[]} [params.excludeContentIds] An array of content IDs to exclude.
 * @param {string[]} [params.excludeContentTypes] An array of content types to exclude.
 * @param {string[]} [params.includeContentTypes] An array of content types to include.
 * @param {boolean} [params.requiresImage] Whether the content must have an image.
 * @param {boolean} [params.sectionBubbling] Whether automatic section bubbling is applied.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `websiteScheduledContent` query.
 */
module.exports = async (apolloClient, {
  limit,
  skip,
  after,

  sectionId,
  sectionAlias,
  optionId,
  optionName,

  excludeContentIds,
  excludeContentTypes,
  includeContentTypes,

  requiresImage,
  sectionBubbling,

  queryFragment,
  queryName,
} = {}) => {
  const pagination = { limit, skip, after };
  const input = {
    pagination,
    excludeContentIds,
    excludeContentTypes,
    includeContentTypes,
    requiresImage,
    sectionAlias,
    sectionBubbling,
    sectionId,
    optionId,
    optionName,
  };
  const query = buildQuery({ queryFragment, queryName });
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.websiteScheduledContent) return { nodes: [], pageInfo: {} };
  const { pageInfo } = data.websiteScheduledContent;
  const nodes = data.websiteScheduledContent.edges
    .map(edge => (edge && edge.node ? edge.node : null))
    .filter(c => c);
  return { nodes, pageInfo };
};
