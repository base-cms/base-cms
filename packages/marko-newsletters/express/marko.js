const marko = require('marko/express');

module.exports = (app) => {
  app.use(marko());
};
