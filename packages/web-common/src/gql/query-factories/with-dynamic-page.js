const gql = require('graphql-tag');
const defaultFragment = require('../fragments/with-dynamic-page');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `WithDynamicPage` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `contentPage` query.
 */
module.exports = ({ queryFragment } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query WithDynamicPage($input: ContentPageQueryInput!) {
      contentPage(input: $input) {
        ...WithDynamicPageFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
