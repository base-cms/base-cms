const gql = require('graphql-tag');

module.exports = gql`

fragment BlockWebsiteSectionFragment on WebsiteSection {
  id
  alias
}

`;
