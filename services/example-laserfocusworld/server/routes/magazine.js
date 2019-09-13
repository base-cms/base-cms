const { withMagazineIssue } = require('@base-cms/marko-web/middleware');
const magazine = require('../templates/magazine');
const magazineIssue = require('../templates/magazine/issue');
const magazineIssueFragment = require('../api/fragments/magazine-issue-page');

module.exports = (app) => {
  app.get('/magazine', (req, res) => {
    res.marko(magazine);
  });

  app.get('/magazine/:id(\\d+)', withMagazineIssue({
    template: magazineIssue,
    queryFragment: magazineIssueFragment,
  }));
};
