const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-magazine-publication');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockMagazinePublication` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazinePublication` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockMagazinePublication${queryName}($input: MagazinePublicationQueryInput!) {
      magazinePublication(input: $input) {
        ...BlockMagazinePublicationFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
