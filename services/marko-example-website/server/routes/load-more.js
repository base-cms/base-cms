const { withLoadMore } = require('@base-cms/marko-web/middleware');
const contentBlockSubPageA = require('../components/blocks/content/sub-page-a');
const magazineActiveIssues = require('../components/blocks/magazine/active-issues');

// Register blocks that support load more...
const blocks = {
  'content-block-sub-page-a': contentBlockSubPageA,
  'magazine-block-active-issues': magazineActiveIssues,
};

module.exports = (app) => {
  app.get('/load-more/:blockName', withLoadMore({
    blocks,
  }));
};
