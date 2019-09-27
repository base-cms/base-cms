const index = require('./sitemap-index');
const sections = require('./sections');
const content = require('./content');
const googleNews = require('./google-news');

const xml = () => (req, res, next) => {
  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  next();
};

module.exports = (app) => {
  app.get('/sitemap.xml', xml(), index);
  app.get('/sitemap-google-news.xml', xml(), googleNews);
  app.get('/sitemap/sections.xml', xml(), sections);
  app.get('/sitemap/:type([a-z]+):suffix(.\\d+)?.xml', xml(), content);
};
