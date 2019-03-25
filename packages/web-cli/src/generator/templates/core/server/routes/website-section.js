const { withWebsiteSection } = require('@base-cms/marko-web/middleware');
const section = require('../templates/website-section');

module.exports = (app) => {
  app.get('/:alias([a-z0-9-/]+)', withWebsiteSection({
    template: section,
  }));
};
