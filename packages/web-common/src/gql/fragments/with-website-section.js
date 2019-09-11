const gql = require('graphql-tag');

module.exports = gql`

fragment WithWebsiteSectionFragment on WebsiteSection {
  id
  alias
  name
  redirectTo
  canonicalPath
}

`;
