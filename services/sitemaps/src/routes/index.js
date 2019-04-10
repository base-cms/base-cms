const sitemap = require('./sitemap');
const sitemapSections = require('./sitemap-sections');
const sitemapContent = require('./sitemap-content');
const sitemapGoogleNews = require('./sitemap-google-news');
const sitemapMiddleware = require('./middleware');

module.exports = (app) => {
  app.get('/sitemap.xml', sitemapMiddleware, sitemap);
  app.get('/sitemap-google-news.xml', sitemapMiddleware, sitemapGoogleNews);
  app.get('/sitemap/sections.xml', sitemapMiddleware, sitemapSections);
  app.get('/sitemap/*.xml', sitemapMiddleware, sitemapContent);
};
