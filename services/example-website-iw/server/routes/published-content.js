const events = require('../templates/published-content/events');
const webinars = require('../templates/published-content/webinars');
const whitePapers = require('../templates/published-content/white-papers');
const videos = require('../templates/published-content/videos');

module.exports = (app) => {
  app.get('/events', (_, res) => { res.marko(events); });
  app.get('/webcasts', (_, res) => { res.marko(webinars); });
  app.get('/white-papers', (_, res) => { res.marko(whitePapers); });
  app.get('/videos', (_, res) => { res.marko(videos); });
};
