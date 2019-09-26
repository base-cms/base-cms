const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const moment = require('moment');
const createImage = require('../utils/create-image');
const URLSet = require('../utils/urlset');

const query = gql`

query ContentSitemapNewsUrls {
  contentSitemapNewsUrls {
    id
    loc
    title
    published
    publication {
      id
      name
      language
    }
    images {
      id
      loc
      caption
    }
  }
}

`;

const createPublication = ({ name, language }) => {
  const parts = [
    `<news:name>${name}</news:name>`,
    `<news:language>${language}</news:language>`,
  ];
  return `<news:publication>${parts.join('')}</news:publication>`;
};

const createUrl = ({
  loc,
  title,
  published,
  publication,
  images,
}) => {
  // News requires a publication, a published date and a title.
  if (!publication || !published || !title) return null;
  const parts = [
    createPublication(publication),
    `<news:publication_date>${moment(published).toISOString()}</news:publication_date>`,
    `<news:title>${title}</news:title>`,
  ];
  const imageParts = [];
  if (images && images.length) imageParts.push(...images.map(image => createImage(image)));
  return `<loc>${loc}</loc><news:news>${parts.join('')}</news:news>${imageParts.join('')}`;
};

module.exports = asyncRoute(async (req, res) => {
  const { apollo } = res.locals;
  const { data } = await apollo.query({ query });
  const { contentSitemapNewsUrls } = data;

  const urlset = new URLSet();
  urlset
    .setAttr('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    .setAttr('xmlns:news', 'http://www.google.com/schemas/sitemap-news/0.9')
    .setAttr('xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1')
    .setAttr('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .setUrls(contentSitemapNewsUrls.map(url => createUrl(url)).filter(v => v));

  res.send(urlset.build());
});
