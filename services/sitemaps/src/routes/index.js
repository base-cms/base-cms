const sitemap = require('./sitemap');
const sitemapSections = require('./sitemap-sections');
const sitemapContent = require('./sitemap-content');
const sitemapGoogleNews = require('./sitemap-google-news');
const health = require('./_health');

module.exports = (app) => {
  health(app);
  app.get('([a-z0-9-/]*)?/sitemap.xml', sitemap);
  app.get('([a-z0-9-/]*)?/sitemap-google-news.xml', sitemapGoogleNews);
  app.get('([a-z0-9-/]*)?/sitemap/sections.xml', sitemapSections);
  app.get('([a-z0-9-/]*)?/sitemap/*.xml', sitemapContent);
};
