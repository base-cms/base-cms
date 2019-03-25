const { withWebsiteSection } = require('@base-cms/marko-web/middleware');
const section = require('../templates/website-section');
const applications = require('../templates/website-section/applications');

module.exports = (app) => {
  app.get('/:alias(applications)', withWebsiteSection({
    template: applications,
  }));

  app.get('/:alias([a-z0-9-/]+)', withWebsiteSection({
    template: section,
  }));
};
