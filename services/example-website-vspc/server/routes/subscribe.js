const subscribe = require('../templates/subscribe');

module.exports = (app) => {
  app.get('/subscribe', (_, res) => {
    res.marko(subscribe);
  });
};
