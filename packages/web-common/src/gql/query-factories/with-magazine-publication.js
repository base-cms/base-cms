const gql = require('graphql-tag');
const defaultFragment = require('../fragments/with-magazine-publication');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `WithMagazinePublication` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazinePublication` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query WithMagazinePublication${queryName}($input: MagazinePublicationQueryInput!) {
      magazinePublication(input: $input) {
        ...WithMagazinePublicationFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
