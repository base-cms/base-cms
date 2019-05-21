
const buildQuery = require('../gql/query-factories/block-all-author-content');

const date = v => (v instanceof Date ? v.valueOf() : v);

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {date} params.since The date to consider content published by
 * @param {number} params.contactId The author's contact (content) ID.
 * @param {string[]} [params.includeContentTypes] An array of content types to include.
 * @param {boolean} [params.requiresImage] Whether the content must have an image.
 * @param {string[]} [params.authorTypes] The author types to use
 *                                        (e.g author, contributor and/or photographer).
 * @param {string} [params.sortField] The field to use for sorting results
 * @param {string} [params.sortOrder] The direction to sort results
 * @param {number} [params.limit] The number of results to return.
 * @param {number} [params.skip] The number of results to skip.
 * @param {string} [params.after] The cursor to start returning results from.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `allAuthorContent` query.
 */
module.exports = async (apolloClient, {
  limit,
  skip,
  after,

  contactId,
  since,
  authorTypes,

  sortField: field,
  sortOrder: order,

  includeContentTypes,
  requiresImage,

  queryFragment,
  queryName,
} = {}) => {
  const pagination = { limit, skip, after };
  const input = {
    contactId,
    authorTypes,
    includeContentTypes,
    pagination,
    requiresImage,
    since: date(since),
  };
  if (field || order) input.sort = { field, order };
  const query = buildQuery({ queryFragment, queryName });
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.allAuthorContent) return { nodes: [], pageInfo: {} };
  const { pageInfo } = data.allAuthorContent;
  const nodes = data.allAuthorContent.edges
    .map(edge => (edge && edge.node ? edge.node : null))
    .filter(c => c);
  return { nodes, pageInfo };
};
