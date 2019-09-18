const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-website-section');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockWebsiteSection` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `websiteSectionAlias` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockWebsiteSection${queryName}($input: WebsiteSectionAliasQueryInput!) {
      websiteSectionAlias(input: $input) {
        ...BlockWebsiteSectionFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
