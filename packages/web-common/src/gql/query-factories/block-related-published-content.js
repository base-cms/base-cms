const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-published-related-content');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockPublishedRelatedContent` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to `edges.node` on
 *                                        the `relatedPublishedContent` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockPublishedRelatedContent${queryName}($input: RelatedPublishedContentQueryInput!) {
      relatedPublishedContent(input: $input) {
        edges {
          node {
            ...BlockPublishedRelatedContentFragment
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
