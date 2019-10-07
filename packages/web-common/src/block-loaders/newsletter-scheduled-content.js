const buildQuery = require('../gql/query-factories/block-newsletter-scheduled-content');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} params.newsletterId The newsletter product ID.
 * @param {number} params.sectionId The section ID.
 * @param {number} params.sectionName The section name.
 *                                     A `sectionId` or `sectionName` is required.
 * @param {number|Date} params.date The deployment date to query.
 * @param {string} [params.timezone] The timezone of the date.
 * @param {boolean} [params.ignoreStartDate] Whether to ignore the start date of the query.
 * @param {number} [params.limit] The number of results to return.
 * @param {number} [params.skip] The number of results to skip
 * @param {string[]} [params.excludeContentTypes] An array of content types to exclude.
 * @param {string[]} [params.includeContentTypes] An array of content types to include.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `newsletterScheduledContent` query.
 */
module.exports = async (apolloClient, {
  limit,
  skip,

  newsletterId,
  sectionId,
  sectionName,

  date,
  timezone,
  ignoreStartDate,

  excludeContentTypes,
  includeContentTypes,

  queryFragment,
  queryName,
} = {}) => {
  const input = {
    newsletterId,
    sectionId,
    sectionName,
    date: date instanceof Date ? date.valueOf() : date,
    timezone,
    ignoreStartDate,
    excludeContentTypes,
    includeContentTypes,
    limit,
    skip,
  };
  const query = buildQuery({ queryFragment, queryName });
  const variables = { input };

  const { data } = await apolloClient.query({ query, variables });
  if (!data || !data.newsletterScheduledContent) return { nodes: [] };
  const nodes = data.newsletterScheduledContent;
  return { nodes };
};
