const gql = require('graphql-tag');

module.exports = gql`

fragment BlockMagazineScheduledContentFragment on Content {
  id
  type
  siteContext {
    path
  }
}

`;
