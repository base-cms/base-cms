const home = require('./home');
const content = require('./content');
const dynamicPages = require('./dynamic-page');
const magazine = require('./magazine');
const publishedContent = require('./published-content');
const search = require('./search');
const subscribe = require('./subscribe');
const websiteSections = require('./website-section');
const IdentityX = require('./identity-x');

module.exports = (app) => {
  IdentityX(app);

  // Homepage
  home(app);

  // Magazine Pages
  magazine(app);

  // Dynamic Pages
  dynamicPages(app);

  // Content Pages
  content(app);

  // Published Content Pages
  publishedContent(app);

  // Search
  search(app);

  // Subscription Pages
  subscribe(app);

  // Website Sections
  websiteSections(app);
};
