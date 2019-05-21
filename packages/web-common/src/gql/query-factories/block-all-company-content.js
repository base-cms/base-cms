const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-all-company-content');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockAllCompanyContent` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to `edges.node` on
 *                                        the `allCompanyContent` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockAllCompanyContent${queryName}($input: AllCompanyContentQueryInput!) {
      allCompanyContent(input: $input) {
        edges {
          node {
            ...BlockAllCompanyContentFragment
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
