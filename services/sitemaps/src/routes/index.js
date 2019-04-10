const sitemap = require('./sitemap');
const sitemapSections = require('./sitemap-sections');
const sitemapContent = require('./sitemap-content');
const sitemapGoogleNews = require('./sitemap-google-news');
const health = require('./_health');
const sitemapMiddleware = require('./middleware');

const prefix = ':prefix([a-z0-9-/]*)?';

module.exports = (app) => {
  health(app);
  app.get(`${prefix}/sitemap.xml`, sitemapMiddleware, sitemap);
  app.get(`${prefix}/sitemap-google-news.xml`, sitemapMiddleware, sitemapGoogleNews);
  app.get(`${prefix}/sitemap/sections.xml`, sitemapMiddleware, sitemapSections);
  app.get(`${prefix}/sitemap/*.xml`, sitemapMiddleware, sitemapContent);
};
