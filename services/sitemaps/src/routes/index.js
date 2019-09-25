const sitemap = require('./sitemap');
// const sitemapSections = require('./sitemap-sections');
// const sitemapContent = require('./sitemap-content');
// const sitemapGoogleNews = require('./sitemap-google-news');

const xml = () => (req, res, next) => {
  res.setHeader('Content-Type', 'text/xml');
  next();
};

module.exports = (app) => {
  app.get('/sitemap.xml', xml(), sitemap);
  // app.get('/sitemap-google-news.xml', sitemapGoogleNews);
  // app.get('/sitemap/sections.xml', sitemapSections);
  // app.get('/sitemap/*.xml', sitemapContent);
};
