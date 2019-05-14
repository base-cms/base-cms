const gql = require('graphql-tag');
const defaultFragment = require('../fragments/with-content');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `WithContent` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `content` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query WithContent${queryName}($input: ContentQueryInput!) {
      content(input: $input) {
        ...WithContentFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
