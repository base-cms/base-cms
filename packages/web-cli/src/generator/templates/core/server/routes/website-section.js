const { withWebsiteSection } = require('@base-cms/marko-web/middleware');
const section = require('../templates/website-section');

module.exports = (app) => {
  app.get('/:alias(*)', withWebsiteSection({
    template: section,
  }));
};
