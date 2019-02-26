const gql = require('graphql-tag');

module.exports = gql`

fragment WithWebsiteSectionFragment on WebsiteSection {
  id
  name
  description
  alias
  metadata {
    title
    description
  }
}

`;
