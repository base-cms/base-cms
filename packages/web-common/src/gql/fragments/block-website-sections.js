const gql = require('graphql-tag');

module.exports = gql`

fragment BlockWebsiteSectionsFragment on WebsiteSection {
  id
  alias
  name
}

`;
