const gql = require('graphql-tag');

module.exports = gql`

fragment BlockAllAuthorContentFragment on Content {
  id
  type
  siteContext {
    path
  }
}

`;
