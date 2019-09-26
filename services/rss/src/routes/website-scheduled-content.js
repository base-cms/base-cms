const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const createChannel = require('../utils/create-channel');

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
          id
          name # encode xml entities
          teaser # encode xml entities
          canonicalPath
          publishedDate(input: { format: "ddd, DD MMM YYYY HH:mm:ss ZZ" })
          ... on Authorable {
            authors(input: { pagination: { limit: 1 } }) {
              edges {
                node {
                  id

                }
              }
            }
          }
        }
      }
    }
  }
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
  } = res.locals;

  const { data } = await apollo.query({ query, variables: { input } });
  const { section } = data.websiteScheduledContent;

  const parts = [
    '<rss version="2.0">',
    createChannel({
      title: channel.title || `${section.fullName || section.name} | ${website.name}`,
      link: channel.link || `${website.origin}${section.canonicalPath}`,
      description: channel.description || createDescription(section, website),
      language: website.language.code,
    }),
    '</rss>',
  ];
  res.send(parts.join(''));
});
