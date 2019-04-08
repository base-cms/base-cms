const moment = require('moment');
const { section: canonicalPathFor } = require('@base-cms/canonical-path');
const { getSections } = require('../../db/base');
const { storeFile } = require('../../db/s3');

const { log } = console;

const formatter = (sections = []) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sections.reduce((str, { url }) => `${str}  <url>
    <loc>${url}</loc>
    <lastmod>${moment().format()}</lastmod>
    <priority>0.7</priority>
    <changefreq>daily</changefreq>
  </url>\n`, '')}
</urlset>`;

const generateSections = async ({ baseUri, canonicalRules }) => {
  const sections = await getSections();
  const updated = new Date();
  const toFormat = await Promise.all(sections.map(async (section) => {
    const alias = await canonicalPathFor(section, { canonicalRules });
    const url = `${baseUri}${alias}`;
    return { updated, url };
  }));
  return formatter(toFormat);
};

module.exports = async ({ baseUri, canonicalRules }) => {
  log('\n  Generating sections');
  const contents = await generateSections({ baseUri, canonicalRules });
  log('    Uploading sections...');
  await storeFile(contents, 'sitemap/sections.xml');
};
