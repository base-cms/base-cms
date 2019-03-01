const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-website-scheduled-content');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockWebsiteScheduledContent` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to `edges.node` on
 *                                        the `websiteScheduledContent` query.
 */
module.exports = ({ queryFragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockWebsiteScheduledContent($input: WebsiteScheduledContentQueryInput!) {
      websiteScheduledContent(input: $input) {
        edges {
          node {
            ...BlockWebsiteScheduledContentFragment
            ${spreadFragmentName}
          }
        }
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
