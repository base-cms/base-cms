const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const createChannel = require('../utils/create-channel');
const createItem = require('../utils/create-item');
const contentFragment = require('../api/content-fragment');

const query = gql`
  query RSSAllPublishedContent($input: AllPublishedContentQueryInput = {}) {
    allPublishedContent(input: $input) {
      edges {
        node {
          ...RSSItemContentFragment
        }
      }
    }
  }
  ${contentFragment}
`;

module.exports = asyncRoute(async (req, res) => {
  const {
    apollo,
    input,
    channel,
    websiteContext: website,
    mountHref,
  } = res.locals;

  const { data } = await apollo.query({ query, variables: { input } });
  const { edges } = data.allPublishedContent;

  const parts = [
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    createChannel({
      title: channel.title || `Published Content Feed | ${website.name}`,
      link: channel.link || website.origin,
      description: channel.description || `The latest published content from ${website.name}`,
      language: website.language.code,
      mountHref,
      items: edges.map(edge => createItem(edge.node, website)),
    }),
    '</rss>',
  ];
  res.end(parts.join(''));
});
