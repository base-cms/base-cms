const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const createChannel = require('../utils/create-channel');
const createItem = require('../utils/create-item');
const contentFragment = require('../api/content-fragment');

const query = gql`
  query RSSWebsiteScheduledContent($input: WebsiteScheduledContentQueryInput) {
    websiteScheduledContent(input: $input) {
      section {
        id
        alias
        name
        fullName
        description
        canonicalPath
      }
      edges {
        node {
          ...RSSItemContentFragment
        }
      }
    }
  }
  ${contentFragment}
`;

const createDescription = (section, website) => {
  if (section.description) return section.description;
  if (section.alias === 'home') {
    if (website.description) return website.description;
    return `The latest articles, news, products, blogs and videos from ${website.name}`;
  }
  return `Articles, news, products, blogs and videos covering the ${section.fullName || section.name} market.`;
};

module.exports = asyncRoute(async (req, res) => {
  const {
    apollo,
    input,
    channel,
    websiteContext: website,
    mountHref,
  } = res.locals;

  const { data } = await apollo.query({ query, variables: { input } });
  const { section, edges } = data.websiteScheduledContent;

  const parts = [
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    createChannel({
      title: channel.title || `${section.fullName || section.name} | ${website.name}`,
      link: channel.link || `${website.origin}${section.canonicalPath}`,
      description: channel.description || createDescription(section, website),
      language: website.language.code,
      mountHref,
      items: edges.map(edge => createItem(edge.node, website)),
    }),
    '</rss>',
  ];
  res.send(parts.join(''));
});
