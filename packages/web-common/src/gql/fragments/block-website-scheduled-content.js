const gql = require('graphql-tag');

module.exports = gql`

fragment BlockWebsiteScheduledContentFragment on Content {
  id
  type
  siteContext {
    path
  }
}

`;
