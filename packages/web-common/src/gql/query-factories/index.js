const blockWebsiteScheduledContent = require('./block-website-scheduled-content');
const blockMagazinePublications = require('./block-magazine-publications');
const blockMagazineLatestIssue = require('./block-magazine-latest-issue');
const blockMagazineActiveIssues = require('./block-magazine-active-issues');

const withContent = require('./with-content');
const withDynamicPage = require('./with-dynamic-page');
const withWebsiteSection = require('./with-website-section');
const withMagazineIssue = require('./with-magazine-issue');
const withMagazinePublication = require('./with-magazine-publication');

module.exports = {
  // Blocks
  blockWebsiteScheduledContent,
  blockMagazinePublications,
  blockMagazineLatestIssue,
  blockMagazineActiveIssues,

  // Pages
  withContent,
  withDynamicPage,
  withWebsiteSection,
  withMagazineIssue,
  withMagazinePublication,
};
