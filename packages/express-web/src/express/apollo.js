const { apolloClient } = require('@base-cms/express-apollo');

module.exports = (app, uri, config = {}) => {
  app.use(apolloClient(uri, config, config.link));
};
