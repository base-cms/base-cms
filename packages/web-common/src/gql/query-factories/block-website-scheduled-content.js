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
 * @param {string} [params.sectionFragment] The `graphql-tag` fragment
 *                                          to apply to the `section`
 */
module.exports = ({ queryFragment, queryName = '', sectionFragment } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  const {
    spreadFragmentName: spreadSectionFragment,
    processedFragment: processedSectionFragment,
  } = extractFragmentData(sectionFragment);
  return gql`
    query BlockWebsiteScheduledContent${queryName}($input: WebsiteScheduledContentQueryInput!) {
      websiteScheduledContent(input: $input) {
        section {
          id
          ${spreadSectionFragment}
        }
        edges {
          node {
            ...BlockWebsiteScheduledContentFragment
            ${spreadFragmentName}
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    ${defaultFragment}
    ${processedFragment}
    ${processedSectionFragment}
  `;
};
