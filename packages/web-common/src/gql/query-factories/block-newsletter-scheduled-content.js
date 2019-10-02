const gql = require('graphql-tag');
const defaultFragment = require('../fragments/block-newsletter-scheduled-content');
const { extractFragmentData } = require('../../utils');

/**
 * Builds the `BlockNewsletterScheduledContent` GraphQL operation.
 *
 * @param {object} params
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to
 *                                        the `newsletterScheduledContent` query.
 */
module.exports = ({ queryFragment, queryName = '' } = {}) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query BlockNewsletterScheduledContent${queryName}($input: NewsletterScheduledContentQueryInput!) {
      newsletterScheduledContent(input: $input) {
        ...BlockNewsletterScheduledContentFragment
        ${spreadFragmentName}
      }
    }
    ${defaultFragment}
    ${processedFragment}
  `;
};
