const { withLoadMore } = require('@base-cms/marko-web/middleware');
const contentSubPageA = require('../components/content-sub-page-a');

// Register blocks that support load more...
const blocks = {
  'content-sub-page-a': contentSubPageA,
};

module.exports = (app) => {
  app.get('/load-more/:blockName', withLoadMore({
    blocks,
  }));
};
