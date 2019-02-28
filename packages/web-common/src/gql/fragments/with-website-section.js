const gql = require('graphql-tag');

module.exports = gql`

fragment WithWebsiteSectionFragment on WebsiteSection {
  id
  name
  description
  alias
  redirectTo
  canonicalPath
  metadata {
    title
    description
  }
}

`;
