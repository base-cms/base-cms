const gql = require('graphql-tag');

module.exports = gql`
fragment WebsiteSectionPageFragment on WebsiteSection {
  id
  hierarchy {
    id
    alias
    name
  }
}
`;
