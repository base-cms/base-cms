const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-magazine-publications');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockMagazinePublications` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to `edges.node` on
 *                                        the `magazinePublications` query.
 */
module.exports = ({ queryFragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockMagazinePublications($input: MagazinePublicationsQueryInput!) {
      magazinePublications(input: $input) {
        edges {
          node {
            ...BlockMagazinePublicationsFragment
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
