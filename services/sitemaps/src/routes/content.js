const { asyncRoute, getDefaultContentTypes } = require('@base-cms/utils');
const createError = require('http-errors');
const moment = require('moment');
const gql = require('graphql-tag');
const { PAGE_SIZE } = require('../env');

const query = gql`

query ContentSitemapUrls($input: ContentSitemapUrlsQueryInput) {
  contentSitemapUrls(input: $input) {
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
  const parts = [];
  if (lastmod) parts.push(`<lastmod>${moment(lastmod).toISOString()}</lastmod>`);
  if (changefreq) parts.push(`<changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`<priority>${priority}</priority>`);
  return `<url><loc>${loc}</loc>${parts.join('')}</url>`;
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

  const urlset = contentSitemapUrls.map(url => createUrl(url));
  const lines = ['<?xml version="1.0" encoding="utf-8"?>'];
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">');
  lines.push(...urlset);
  lines.push('</urlset>');

  res.send(lines.join(''));
});
