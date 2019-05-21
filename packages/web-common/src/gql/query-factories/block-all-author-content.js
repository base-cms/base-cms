const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-all-author-content');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockAllAuthorContent` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to `edges.node` on
 *                                        the `allAuthorContent` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockAllAuthorContent${queryName}($input: AllAuthorContentQueryInput!) {
      allAuthorContent(input: $input) {
        edges {
          node {
            ...BlockAllAuthorContentFragment
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
