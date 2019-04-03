const magazines = require('../templates/magazine');

module.exports = (app) => {
  app.get('/magazine', (req, res) => {
    res.marko(magazines);
  });
};
