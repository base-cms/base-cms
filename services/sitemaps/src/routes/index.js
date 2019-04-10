const sitemap = require('./sitemap');
const sitemapSections = require('./sitemap-sections');
const sitemapContent = require('./sitemap-content');
const sitemapGoogleNews = require('./sitemap-google-news');
const health = require('./_health');

module.exports = (app) => {
  health(app);
  sitemap(app);
  sitemapGoogleNews(app);
  sitemapSections(app);
  sitemapContent(app);
};
