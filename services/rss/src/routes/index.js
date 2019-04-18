const sectionFeed = require('./rss-section');
const middleware = require('./middleware');

module.exports = (app) => {
  app.get('/rss/:alias([a-z-_/]+).xml', middleware, sectionFeed);
};
