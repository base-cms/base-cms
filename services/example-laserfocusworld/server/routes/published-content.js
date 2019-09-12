const videos = require('../templates/published-content/videos');

module.exports = (app) => {
  app.get('/videos', (_, res) => { res.marko(videos); });
};
