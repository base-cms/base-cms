const sitemap = require('./sitemap');
const sitemapSections = require('./sitemap-sections');
const sitemapContent = require('./sitemap-content');
const sitemapGoogleNews = require('./sitemap-google-news');

module.exports = (app) => {
  app.get('/sitemap.xml', sitemap);
  app.get('/sitemap-google-news.xml', sitemapGoogleNews);
  app.get('/sitemap/sections.xml', sitemapSections);
  app.get('/sitemap/*.xml', sitemapContent);
};
