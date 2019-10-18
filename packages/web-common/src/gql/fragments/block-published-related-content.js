const gql = require('graphql-tag');

module.exports = gql`

fragment BlockPublishedRelatedContentFragment on Content {
  id
  type
  siteContext {
    path
  }
}

`;
