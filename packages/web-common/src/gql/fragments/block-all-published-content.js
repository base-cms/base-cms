const gql = require('graphql-tag');

module.exports = gql`

fragment BlockAllPublishedContentFragment on Content {
  id
  type
  siteContext {
    path
  }
}

`;
