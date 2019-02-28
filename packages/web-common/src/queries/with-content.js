const createError = require('http-errors');
const gql = require('graphql-tag');
const defaultFragment = require('../gql/fragments/with-content');
const { extractFragmentData } = require('../utils');

/**
 * Builds the `content` GraphQL query.
 *
 * Guarantees that the following fields will be present:
 *
 * ```
 * id
 * name
 * type
 * teaser
 * body
 * published
 * redirectTo
 * canonicalPath
 * metadata {
 *   title
 *   description
 * }
 * primarySection {
 *   id
 *   name
 *   alias
 * }
 * ```
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `content` query.
 */
const buildQuery = ({ queryFragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query WithContent($input: ContentQueryInput!) {
      content(input: $input) {
        ...WithContentFragment
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
 * @param {string} params.id The content ID to query.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `content` query.
 * @param {object} [params.additionalInput] Additional query input params.
 *
 */
module.exports = async (apolloClient, {
  id,
  queryFragment,
  additionalInput,
} = {}) => {
  if (!id) {
    // No content id was provided. Return a 400.
    throw createError(400, 'No content ID was provided.');
  }

  // Query for the content object using the id.
  const input = { ...additionalInput, id: Number(id) };
  const variables = { input };
  const { data } = await apolloClient.query({ query: buildQuery({ queryFragment }), variables });
  const { content } = data;

  if (!content) {
    // No content was found for this id. Return a 404.
    throw createError(404, `No content was found for id '${id}'`);
  }
  return content;
};
