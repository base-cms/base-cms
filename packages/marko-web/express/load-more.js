const withLoadMore = require('../middleware/with-load-more');

module.exports = (app) => {
  const { config } = app.locals;
  app.use(config.loadMoreMountPoint(), withLoadMore());
};
