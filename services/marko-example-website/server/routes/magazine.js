const gql = require('graphql-tag');
const {
  withMagazinePublication,
} = require('@base-cms/marko-web/middleware');
const magazines = require('../templates/magazine');
const publication = require('../templates/magazine/publication');

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
      }
    `,
  }));
};
