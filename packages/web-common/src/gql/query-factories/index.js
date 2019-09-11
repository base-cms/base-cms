const blockContent = require('./block-content');
const blockWebsiteScheduledContent = require('./block-website-scheduled-content');
const blockWebsiteSection = require('./block-website-section');
const blockMagazinePublications = require('./block-magazine-publications');
const blockMagazineLatestIssue = require('./block-magazine-latest-issue');
const blockMagazineActiveIssues = require('./block-magazine-active-issues');
const blockMagazineScheduledContent = require('./block-magazine-scheduled-content');
const blockAllPublishedContent = require('./block-all-published-content');
const blockAllAuthorContent = require('./block-all-author-content');
const blockAllCompanyContent = require('./block-all-company-content');

const withContent = require('./with-content');
const withDynamicPage = require('./with-dynamic-page');
const withWebsiteSection = require('./with-website-section');
const withMagazineIssue = require('./with-magazine-issue');
const withMagazinePublication = require('./with-magazine-publication');

module.exports = {
  // Blocks
  blockContent,
  blockWebsiteScheduledContent,
  blockWebsiteSection,
  blockMagazinePublications,
  blockMagazineLatestIssue,
  blockMagazineActiveIssues,
  blockMagazineScheduledContent,
  blockAllPublishedContent,
  blockAllAuthorContent,
  blockAllCompanyContent,

  // Pages
  withContent,
  withDynamicPage,
  withWebsiteSection,
  withMagazineIssue,
  withMagazinePublication,
};
