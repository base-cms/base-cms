const home = require('./home');
const content = require('./content');
const dynamicPages = require('./dynamic-page');
const publishedContent = require('./published-content');
const search = require('./search');
const websiteSections = require('./website-section');

module.exports = (app) => {
  // Homepage
  home(app);

  // Dynamic Pages
  dynamicPages(app);

  // Content Pages
  content(app);

  // Published Content Pages
  publishedContent(app);

  // Search
  search(app);

  // Website Sections
  websiteSections(app);
};
