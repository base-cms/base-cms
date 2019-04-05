const { getSections } = require('../../db/base');
const { storeFile } = require('../../db/s3');
const { formatSections: formatter } = require('./format');

const { log } = console;

const generateSections = async () => {
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
