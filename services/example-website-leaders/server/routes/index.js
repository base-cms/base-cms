const home = require('./home');
const content = require('./content');
const websiteSections = require('./website-section');

module.exports = (app) => {
  // Homepage
  home(app);

  // Content Pages
  content(app);

  // Website Sections
  websiteSections(app);
};
