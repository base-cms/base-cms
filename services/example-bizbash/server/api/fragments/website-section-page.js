const gql = require('graphql-tag');

module.exports = gql`
fragment WebsiteSectionPageFragment on WebsiteSection {
  hierarchy {
    id
    alias
    name
  }
}
`;
