const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-magazine-active-issues');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockMagazineActiveIssues` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to `edges.node` on
 *                                        the `magazineActiveIssues` query.
 */
module.exports = ({ queryFragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockMagazineActiveIssues($input: MagazineActiveIssuesQueryInput!) {
      magazineActiveIssues(input: $input) {
        edges {
          node {
            ...BlockMagazineActiveIssuesFragment
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
