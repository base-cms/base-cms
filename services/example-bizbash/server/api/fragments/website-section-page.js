const gql = require('graphql-tag');

module.exports = gql`
fragment WebsiteSectionPageFragment on WebsiteSection {
  fullName
  hierarchy {
    id
    alias
    name
  }
}
`;
