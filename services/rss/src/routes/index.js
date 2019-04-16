const sectionFeed = require('./rss-section');
const middleware = require('./middleware');

module.exports = (app) => {
  app.get('/feeds/:alias.xml', middleware, sectionFeed);
};
