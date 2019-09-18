const { withDynamicPage } = require('@base-cms/marko-web/middleware');
const page = require('../templates/dynamic-page');
const queryFragment = require('../api/fragments/dynamic-page');

module.exports = (app) => {
  app.get('/page/:alias', withDynamicPage({
    template: page,
    queryFragment,
  }));
};
