const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const moment = require('moment');
const URLSet = require('../utils/urlset');

const query = gql`

query WebsiteSectionSitemapUrls {
  websiteSectionSitemapUrls {
    id
    loc
    lastmod
    changefreq
    priority
  }
}

`;

const createUrl = ({
  loc,
  lastmod,
  changefreq,
  priority,
}) => {
  if (!lastmod) return null;
  const parts = [];
  if (changefreq) parts.push(`<changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`<priority>${priority}</priority>`);
  return `<loc>${loc}</loc><lastmod>${moment(lastmod).toISOString()}</lastmod>${parts.join('')}`;
};

module.exports = asyncRoute(async (req, res) => {
  const { apollo } = res.locals;
  const { data } = await apollo.query({ query });
  const { websiteSectionSitemapUrls } = data;

  const urlset = new URLSet();
  urlset
    .setAttr('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    .setAttr('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .setAttr('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd')
    .setUrls(websiteSectionSitemapUrls.map(url => createUrl(url)));

  res.end(urlset.build());
});
