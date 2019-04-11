const gql = require('graphql-tag');
const {
  withMagazinePublication,
  withMagazineIssue,
} = require('@base-cms/marko-web/middleware');
const magazines = require('../templates/magazine');
const publication = require('../templates/magazine/publication');
const issue = require('../templates/magazine/issue');

module.exports = (app) => {
  app.get('/magazine', (req, res) => {
    res.marko(magazines);
  });

  app.get('/magazine/:id([a-fA-F0-9]{24})', withMagazinePublication({
    template: publication,
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
      }
    `,
  }));

  app.get('/magazine/:id(\\d+)', withMagazineIssue({
    template: issue,
    queryFragment: gql`
      fragment MagazineIssuePageFragment on MagazineIssue {
        id
        name
        description
        coverDescription
        credit
        digitalEditionUrl
        canonicalPath
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
