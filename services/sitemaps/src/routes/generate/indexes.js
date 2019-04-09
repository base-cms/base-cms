const moment = require('moment');
const { listObjects, storeFile, Prefix } = require('../../db/s3');

const { log } = console;

const formatter = (files = []) => `<?xml version="1.0" encoding="utf-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files.reduce((str, { url, lastmod }) => `${str}  <sitemap>
    <loc>${url}</loc>
    <lastmod>${moment(lastmod).format()}</lastmod>
  </sitemap>\n`, '')}
</sitemapindex>`;

const generateIndex = async ({ baseUri }) => {
  const objects = await listObjects({ Prefix });
  const files = objects.Contents
    .map((obj) => {
      const filename = obj.Key.replace(Prefix, '');
      const url = `${baseUri}${filename}`;
      return { url, filename, lastmod: obj.LastModified };
    })
    .filter(obj => obj.filename !== '/' && obj.filename !== '/sitemap.xml');
  return formatter(files);
};

module.exports = async ({ baseUri }) => {
  log('\n  Generating updated index...');
  const contents = await generateIndex({ baseUri });
  log('    Uploading index...');
  await storeFile(contents, 'sitemap.xml');
};
