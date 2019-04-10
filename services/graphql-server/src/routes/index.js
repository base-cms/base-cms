const graphql = require('./graphql');
const health = require('./_health');

module.exports = (app) => {
  health(app);
  app.use('/', graphql);
};
