const { listObjects, storeFile, Prefix } = require('../../db/s3');

const { log } = console;

const generateIndex = async () => {
const formatter = (files = []) => `<?xml version="1.0" encoding="utf-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files.reduce((str, { uri, lastmod }) => `${str}  <sitemap>
    <loc>${uri}</loc>
    <lastmod>${moment(lastmod).format()}</lastmod>
  </sitemap>\n`, '')}
</sitemapindex>`;

  const objects = await listObjects({ Prefix });
  const files = objects.Contents
    .map(obj => ({ filename: obj.Key.replace(Prefix, ''), lastmod: obj.LastModified }))
    .filter(obj => obj.filename !== '/' && obj.filename !== '/sitemap.xml');
  return formatter(files);
};

module.exports = async () => {
  log('\n  Generating updated index...');
  const contents = await generateIndex();
  log('    Uploading index...');
  await storeFile(contents, 'sitemap.xml');
};
