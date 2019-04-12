const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-magazine-latest-issue');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockMagazineLatestIssue` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to `edges.node` on
 *                                        the `magazineLatestIssue` query.
 */
module.exports = ({ queryFragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockMagazineLatestIssue($input: MagazineLatestIssueQueryInput!) {
      magazineLatestIssue(input: $input) {
        ...BlockMagazineLatestIssueFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
