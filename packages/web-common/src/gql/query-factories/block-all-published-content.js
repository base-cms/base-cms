const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-all-published-content');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockPublishedContent` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to `edges.node` on
 *                                        the `allPublishedContent` query.
 */
module.exports = ({ queryFragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockPublishedContent($input: AllPublishedContentQueryInput!) {
      allPublishedContent(input: $input) {
        edges {
          node {
            ...BlockAllPublishedContentFragment
            ${spreadFragmentName}
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
