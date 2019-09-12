const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-dynamic-page');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockDynamicPage` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `contentPage` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockDynamicPage${queryName}($input: ContentPageQueryInput!) {
      content(input: $input) {
        ...BlockDynamicPageFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
