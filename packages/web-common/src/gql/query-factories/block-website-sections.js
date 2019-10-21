const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-website-sections');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockWebsiteSections` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `websiteSections` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockWebsiteSections${queryName}($input: WebsiteSectionsQueryInput!) {
      websiteSections(input: $input) {
        edges {
          node {
            ...BlockWebsiteSectionsFragment
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
