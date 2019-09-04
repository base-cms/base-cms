const home = require('./home');
const websiteSections = require('./website-section');

module.exports = (app) => {
  // Homepage
  home(app);

  // Website Sections
  websiteSections(app);
};
