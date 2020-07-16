const template = require('../templates/deployments');

module.exports = (app) => {
  app.get('/deployments', (_, res) => { res.marko(template); });
  app.get('/deployments/*', (_, res) => { res.marko(template); });
};
