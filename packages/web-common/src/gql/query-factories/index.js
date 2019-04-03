const blockWebsiteScheduledContent = require('./block-website-scheduled-content');
const blockMagazinePublications = require('./block-magazine-publications');
const blockMagazineLatestIssue = require('./block-magazine-latest-issue');

const withContent = require('./with-content');
const withDynamicPage = require('./with-dynamic-page');
const withWebsiteSection = require('./with-website-section');

module.exports = {
  // Blocks
  blockWebsiteScheduledContent,
  blockMagazinePublications,
  blockMagazineLatestIssue,

  // Pages
  withContent,
  withDynamicPage,
  withWebsiteSection,
};
