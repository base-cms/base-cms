const gql = require('graphql-tag');
const defaultFragment = require('../fragments/with-magazine-issue');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `WithMagazineIssue` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazineIssueAlias` query.
 */
module.exports = ({ queryFragment } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query WithMagazineIssue($input: MagazineIssueQueryInput!) {
      magazineIssue(input: $input) {
        ...WithMagazineIssueFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
