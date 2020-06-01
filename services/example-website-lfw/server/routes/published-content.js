const webinars = require('@endeavor-business-media/package-shared/templates/published-content/webinars');
const events = require('@endeavor-business-media/package-shared/templates/published-content/events');
const videos = require('@endeavor-business-media/package-shared/templates/published-content/videos');

module.exports = (app) => {
  app.get('/events', (_, res) => { res.marko(events); });
  app.get('/webcasts', (_, res) => { res.marko(webinars); });
  app.get('/videos', (_, res) => { res.marko(videos); });
};
