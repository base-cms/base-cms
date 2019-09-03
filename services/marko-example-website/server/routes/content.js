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
        createdBy {
          id
          username
        }
        company {
          id
          name
          canonicalPath
        }
        primarySection {
          id
          name
          fullName
          alias
          canonicalPath
          hierarchy {
            id
            name
            alias
            canonicalPath
          }
        }
        primaryImage {
          id
          src
          alt
        }
        ... on ContentVideo {
          embedCode
        }
        ... on ContentWebinar {
          sponsors {
            edges {
              node {
                id
                name
                canonicalPath
              }
            }
          }
        }
        ... on ContentNews {
          source
          byline
        }
        ... on ContentArticle {
          sidebars
        }
        ... on Authorable {
          authors {
            edges {
              node {
                id
                name
                canonicalPath
              }
            }
          }
          contributors {
            edges {
              node {
                id
                name
                canonicalPath
              }
            }
          }
          photographers {
            edges {
              node {
                id
                name
                canonicalPath
              }
            }
          }
        }
      }
    `,
  }));
};
