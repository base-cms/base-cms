const gql = require('graphql-tag');
const { withContent } = require('@base-cms/marko-web/middleware');
const content = require('../templates/content');

module.exports = (app) => {
  app.get('/:prefix(*):id(\\d{8}):suffix(*)', withContent({
    template: content,
    queryFragment: gql`
      fragment ContentPageFragment on Content {
        id
        name
        teaser(input: { useFallback: false })
        body
        published
        primarySection {
          id
          name
          alias
          canonicalPath
        }
        primaryImage {
          id
          src
          alt
        }
      }
    `,
  }));
};
