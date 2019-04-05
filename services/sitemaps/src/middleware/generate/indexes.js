const { listObjects, storeFile, Prefix } = require('../../db/s3');
const { formatIndex: formatter } = require('./format');

const { log } = console;

const generateIndex = async () => {
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
