const { withWebsiteSection } = require('@base-cms/marko-web/middleware');
const home = require('../templates/index');
const queryFragment = require('../api/fragments/website-section-page');

module.exports = (app) => {
  app.get('/', withWebsiteSection({
    aliasResolver: () => 'home',
    template: home,
    queryFragment,
  }));
};
