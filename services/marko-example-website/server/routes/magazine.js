const gql = require('graphql-tag');
const {
  withMagazinePublication,
  withMagazineIssue,
} = require('@base-cms/marko-web/middleware');
const magazine = require('../templates/magazine');
const magazinePublication = require('../templates/magazine-publication');
const magazineIssue = require('../templates/magazine-issue');

module.exports = (app) => {
  app.get('/magazine', (req, res) => {
    res.marko(magazine);
  });

  app.get('/magazine/:id([a-fA-F0-9]{24})', withMagazinePublication({
    template: magazinePublication,
    queryFragment: gql`
      fragment MagazinePageFragment on MagazinePublication {
        id
        name
        description
        coverImage {
          id
          src
        }
        canonicalPath
        metadata {
          title
          description
        }
      }
    `,
  }));

  app.get('/magazine/:id(\\d+)', withMagazineIssue({
    template: magazineIssue,
    queryFragment: gql`
      fragment MagazineIssuePageFragment on MagazineIssue {
        id
        name
        description
        coverDescription
        credit
        digitalEditionUrl
        canonicalPath
        metadata {
          title
          description
        }
        coverImage {
          id
          src
        }
        publication {
          id
          name
          description
          subscribeUrl
          canonicalPath
        }
      }
    `,
  }));
};
