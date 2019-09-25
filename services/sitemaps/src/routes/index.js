const index = require('./sitemap-index');
const sections = require('./sections');
// const sitemapContent = require('./sitemap-content');
// const sitemapGoogleNews = require('./sitemap-google-news');

const xml = () => (req, res, next) => {
  res.setHeader('Content-Type', 'text/xml');
  next();
};

module.exports = (app) => {
  app.get('/sitemap.xml', xml(), index);
  // app.get('/sitemap-google-news.xml', sitemapGoogleNews);
  app.get('/sitemap/sections.xml', xml(), sections);
  // app.get('/sitemap/*.xml', sitemapContent);
};
