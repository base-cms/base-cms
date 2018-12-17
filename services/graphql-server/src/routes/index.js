const graphql = require('./graphql');

module.exports = (app) => {
  app.use('/', graphql);
};
