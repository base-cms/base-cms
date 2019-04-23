const gql = require('graphql-tag');
const defaultFragment = require('../fragments/with-magazine-subscribe-url');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `WithMagazineSubscribeUrl` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `magazineSubscribeUrl` query.
 */
module.exports = ({ queryFragment } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query WithMagazineSubscribeUrl($input: MagazineSubscribeUrlQueryInput!) {
      magazineSubscribeUrl(input: $input) {
        ...WithMagazineSubscribeUrlFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
