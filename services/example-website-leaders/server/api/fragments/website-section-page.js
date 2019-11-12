const gql = require('graphql-tag');

module.exports = gql`
fragment WebsiteSectionPageFragment on WebsiteSection {
  id
  name
  hierarchy {
    id
    alias
    name
  }
}
`;
