const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-magazine-issue');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockMagazineIssue` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazineIssue` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockMagazineIssue${queryName}($input: MagazineIssueQueryInput!) {
      magazineIssue(input: $input) {
        ...BlockMagazineIssueFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
