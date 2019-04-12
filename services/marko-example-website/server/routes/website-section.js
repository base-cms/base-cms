const gql = require('graphql-tag');
const { withWebsiteSection } = require('@base-cms/marko-web/middleware');
const section = require('../templates/website-section');
const applications = require('../templates/website-section/applications');

const queryFragment = gql`
  fragment WebsiteSectionPageFragment on WebsiteSection {
    fullName
    hierarchy {
      id
      name
    }
  }
`;

module.exports = (app) => {
  app.get('/:alias(tactical)', withWebsiteSection({
    queryFragment,
    template: applications,
  }));

  app.get('/:alias([a-z0-9-/]+)', withWebsiteSection({
    queryFragment,
    template: section,
  }));
};
