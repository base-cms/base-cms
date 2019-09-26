const { asyncRoute, getDefaultContentTypes } = require('@base-cms/utils');
const createError = require('http-errors');
const moment = require('moment');
const gql = require('graphql-tag');
const { PAGE_SIZE } = require('../env');
const createImage = require('../utils/create-image');
const URLSet = require('../utils/urlset');

const query = gql`

query ContentSitemapUrls($input: ContentSitemapUrlsQueryInput) {
  contentSitemapUrls(input: $input) {
    id
    loc
    lastmod
    changefreq
    priority
    images {
      id
      loc
      caption
    }
  }
}

`;

const createUrl = ({
  loc,
  lastmod,
  changefreq,
  priority,
  images,
}) => {
  const parts = [];
  if (lastmod) parts.push(`<lastmod>${moment(lastmod).toISOString()}</lastmod>`);
  if (changefreq) parts.push(`<changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`<priority>${priority}</priority>`);
  if (images && images.length) parts.push(...images.map(image => createImage(image)));
  return `<loc>${loc}</loc>${parts.join('')}`;
};

module.exports = asyncRoute(async (req, res) => {
  const { apollo } = res.locals;
  const { type, suffix } = req.params;
  const types = getDefaultContentTypes();
  if (!types.includes(type)) throw createError(404, `No content type found for ${type}`);

  const page = suffix ? parseInt(suffix.replace('.', ''), 10) : 0;
  const limit = PAGE_SIZE;
  const skip = limit * page;

  const input = { contentTypes: [type], pagination: { limit, skip } };

  const { data } = await apollo.query({ query, variables: { input } });
  const { contentSitemapUrls } = data;

  if (!contentSitemapUrls.length) throw createError(404, 'No content found.');

  const urlset = new URLSet();
  urlset
    .setAttr('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    .setAttr('xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1')
    .setAttr('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .setAttr('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd')
    .setUrls(contentSitemapUrls.map(url => createUrl(url)));

  res.send(urlset.build());
});
