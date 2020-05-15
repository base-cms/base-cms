const { createClient } = require('@base-cms/express-apollo');
const gql = require('graphql-tag');
const { getAsArray } = require('@base-cms/object-path');
const { GRAPHQL_URI } = require('../env');

const query = gql`
  query ProcessOmedaLinks($ids: [Int!]!) {
    allContent(input: { ids: $ids, status: any, pagination: { limit: 0 } }) {
      edges {
        node {
          id
          type
          name
          company(input: { status: any }) {
            id
            name
          }
        }
      }
    }
  }
`;

const hashPattern = /#cid-(\d{8})/;

module.exports = async ({ html, tenantKey, urls = [] } = {}) => {
  const graphql = createClient(GRAPHQL_URI, {}, {
    headers: { 'x-tenant-key': tenantKey },
  });

  const contentUrls = urls.map((url) => {
    const match = hashPattern.exec(url.value);
    if (match && match[1]) {
      const contentId = parseInt(match[1], 10);
      return { ...url, contentId };
    }
    return url;
  }).filter(url => url.contentId);

  // only set advertiser on certain types: TextAd and Promotion
  // check for the company
  // don't assume linkUrl means an advertiser... other types also have that field

  const contentIds = [...new Set([...contentUrls.map((url => url.contentId))])];
  if (!contentIds.length) return html;

  const { data } = await graphql.query({ query, variables: { ids: contentIds } });
  const types = ['text-ad', 'promotion'];
  // only include text ad or promotion nodes that have a company
  const nodeMap = getAsArray(data, 'allContent.edges')
    .map(edge => edge.node)
    .filter(node => types.includes(node.type) && node.company && node.company.name)
    .reduce((map, node) => {
      map.set(node.id, node);
      return map;
    }, new Map());

  if (!nodeMap.size) return html;

  let replaced = html;
  contentUrls.forEach((url) => {
    const node = nodeMap.get(url.contentId);
    if (node) {
      const { element } = url;
      const dpm = `<!--DPM: ln="${node.name}" lc="Advertising" lcv="${node.company.name}" -->`;
      replaced = replaced.replace(element, `${element}${dpm}`);
    }
  });

  return replaced;
};
