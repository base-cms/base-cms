const gql = require('graphql-tag');
const defaultFragment = require('../fragments/with-website-section');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `WithWebsiteSection` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `websiteSectionAlias` query.
 */
module.exports = ({ queryFragment } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query WithWebsiteSection($input: WebsiteSectionAliasQueryInput!, $redirect: WebsiteSectionRedirectQueryInput!) {
      websiteSectionAlias(input: $input) {
        ...WithWebsiteSectionFragment
        ${spreadFragmentName}
      }
      websiteSectionRedirect(input: $redirect) {
        ...WithWebsiteSectionFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
