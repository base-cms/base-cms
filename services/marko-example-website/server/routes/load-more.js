const { withLoadMore } = require('@base-cms/marko-web/middleware');
const contentBlockSubPageA = require('../components/blocks/content/sub-page-a');

// Register blocks that support load more...
const blocks = {
  'content-block-sub-page-a': contentBlockSubPageA,
};

module.exports = (app) => {
  app.get('/load-more/:blockName', withLoadMore({
    blocks,
  }));
};
