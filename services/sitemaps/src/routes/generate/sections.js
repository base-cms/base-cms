const { getSections } = require('../../db/base');
const { storeFile } = require('../../db/s3');

const { log } = console;

const generateSections = async () => {
const formatter = (sections = []) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sections.reduce((str, { canonicalPath }) => `${str}  <url>
    <loc>${canonicalPath}</loc>
    <lastmod>${moment().format()}</lastmod>
    <priority>0.7</priority>
    <changefreq>daily</changefreq>
  </url>\n`, '')}
</urlset>`;
  const sections = await getSections();
  const updated = new Date();
  const toFormat = sections.filter(s => s.alias !== 'home').map(({ alias }) => ({ alias, updated }));
  return formatter(toFormat);
};

module.exports = async () => {
  log('\n  Generating sections');
  const contents = await generateSections();
  log('    Uploading sections...');
  await storeFile(contents, 'sitemap/sections.xml');
};
