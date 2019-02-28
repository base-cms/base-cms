const createError = require('http-errors');
const gql = require('graphql-tag');
const defaultFragment = require('../gql/fragments/with-dynamic-page');
const { extractFragmentData } = require('../utils');

/**
 * Builds the `contentPage` GraphQL query.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `contentPage` query.
 */
const buildQuery = ({ queryFragment } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData({ queryFragment });
  return gql`
    query WithDynamicPage($input: ContentPageQueryInput!) {
      contentPage(input: $input) {
        ...WithDynamicPageFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
exports.buildQuery = buildQuery;

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} params.alias The content page alias to query.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `contentPage` query.
 */
module.exports = async (apolloClient, {
  alias,
  queryFragment,
} = {}) => {
  if (!alias) {
    // No content page alias was provided. Return a 400.
    throw createError(400, 'No content page alias was provided.');
  }

  // Query for the content page using the alias.
  const input = { alias };
  const variables = { input };
  const { data } = await apolloClient.query({ query: buildQuery({ queryFragment }), variables });
  const { contentPage: page } = data;

  if (!page) {
    // No content page was found for this alias. Return a 404.
    throw createError(404, `No content page was found for alias '${alias}'`);
  }
  return { page };
};
