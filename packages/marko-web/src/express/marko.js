require('marko/node-require').install();
const marko = require('marko/express');

module.exports = (app) => {
  app.use(marko());
};
