const blockWebsiteScheduledContent = require('./block-website-scheduled-content');
const blockMagazinePublications = require('./block-magazine-publications');

const withContent = require('./with-content');
const withDynamicPage = require('./with-dynamic-page');
const withWebsiteSection = require('./with-website-section');

module.exports = {
  // Blocks
  blockWebsiteScheduledContent,
  blockMagazinePublications,

  // Pages
  withContent,
  withDynamicPage,
  withWebsiteSection,
};
