require('marko/node-require').install();
const marko = require('marko/express');

module.exports = (app, config = {}) => {
  app.use(marko(config));
};
