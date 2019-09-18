const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-content');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockContent` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `content` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockContent${queryName}($input: ContentQueryInput!) {
      content(input: $input) {
        ...BlockContentFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
