const { withWebsiteSection } = require('@base-cms/marko-web/middleware');
const section = require('../templates/website-section');
const tactical = require('../templates/website-section/tactical');

module.exports = (app) => {
  app.get('/:alias(tactical)', withWebsiteSection({
    template: tactical,
  }));

  app.get('/:alias(*)', withWebsiteSection({
    template: section,
  }));
};
