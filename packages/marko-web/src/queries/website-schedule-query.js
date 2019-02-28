const gql = require('graphql-tag');
const extractFragmentData = require('../utils/extract-fragment-data');

const buildQuery = ({ fragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData({ fragment });
  return gql`
    query WebsiteScheduledContent($input: WebsiteScheduledContentQueryInput!) {
      websiteScheduledContent(input: $input) {
        edges {
          node {
            id
            ${spreadFragmentName}
          }
        }
      }
    }
    ${processedFragment}
  `;
};

module.exports = (apollo, fragment, {
  after,
  excludeContentIds,
  excludeContentTypes,
  limit,
  includeContentTypes,
  requiresImage,
  sectionBubbling,
  sectionId,
  optionId,
} = {}) => {
  const pagination = { limit, after };
  const input = {
    pagination,
    excludeContentIds,
    excludeContentTypes,
    includeContentTypes,
    requiresImage,
    sectionBubbling,
    sectionId,
    optionId,
  };
  const query = buildQuery({ fragment });
  const variables = { input };
  return apollo.query({ query, variables }).then(({ data: res }) => {
    let items = [];
    if (res && res.websiteScheduledContent) {
      items = res.websiteScheduledContent.edges
        .map(edge => (edge && edge.node ? edge.node : null))
        .filter(c => c);
    }
    return items;
  });
};
