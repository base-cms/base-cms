const { withWebsiteSection } = require('@base-cms/marko-web/middleware');
const section = require('../templates/website-section');
const applications = require('../templates/website-section/applications');
const events = require('../templates/website-section/events');
const webinars = require('../templates/website-section/webinars');
const whitePapers = require('../templates/website-section/white-papers');
const videos = require('../templates/website-section/videos');

module.exports = (app) => {
  app.get('/:alias(tactical)', withWebsiteSection({
    template: applications,
  }));

  // Published content type pages
  app.get('/:alias(events)', withWebsiteSection({
    template: events,
  }));

  app.get('/:alias(webinars)', withWebsiteSection({
    template: webinars,
  }));

  app.get('/:alias(white-papers)', withWebsiteSection({
    template: whitePapers,
  }));

  app.get('/:alias(videos)', withWebsiteSection({
    template: videos,
  }));

  app.get('/:alias([a-z0-9-/]+)', withWebsiteSection({
    template: section,
  }));
};
