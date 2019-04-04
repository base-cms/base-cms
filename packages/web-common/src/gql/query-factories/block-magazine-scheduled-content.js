const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-magazine-scheduled-content');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockMagazineScheduledContent` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to `edges.node` on
 *                                        the `magazineScheduledContent` query.
 */
module.exports = ({ queryFragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockMagazineScheduledContent($input: MagazineScheduledContentQueryInput!) {
      magazineScheduledContent(input: $input) {
        edges {
          node {
            ...BlockMagazineScheduledContentFragment
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
