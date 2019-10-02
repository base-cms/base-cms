const blockContent = require('./block-content');
const blockDynamicPage = require('./block-dynamic-page');
const blockWebsiteScheduledContent = require('./block-website-scheduled-content');
const blockWebsiteSection = require('./block-website-section');
const blockMagazineIssue = require('./block-magazine-issue');
const blockMagazinePublication = require('./block-magazine-publication');
const blockMagazinePublications = require('./block-magazine-publications');
const blockMagazineLatestIssue = require('./block-magazine-latest-issue');
const blockMagazineActiveIssues = require('./block-magazine-active-issues');
const blockMagazineScheduledContent = require('./block-magazine-scheduled-content');
const blockNewsletterScheduledContent = require('./block-newsletter-scheduled-content');
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
  blockDynamicPage,
  blockWebsiteScheduledContent,
  blockWebsiteSection,
  blockMagazineIssue,
  blockMagazinePublication,
  blockMagazinePublications,
  blockMagazineLatestIssue,
  blockMagazineActiveIssues,
  blockMagazineScheduledContent,
  blockNewsletterScheduledContent,
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
