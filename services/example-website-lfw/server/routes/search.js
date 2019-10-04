const template = require('../templates/search');

module.exports = (app) => {
  app.get('/search', (_, res) => { res.marko(template); });
};
