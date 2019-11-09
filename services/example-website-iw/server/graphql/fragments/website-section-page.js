const gql = require('graphql-tag');

module.exports = gql`
fragment WebsiteSectionPageFragment on WebsiteSection {
  id
  name
  description
  hierarchy {
    id
    alias
    name
  }
  isRoot
  children(input: { sort: { field: name, order: asc } }) {
    edges {
      node {
        id
        name
        alias
        canonicalPath
      }
    }
  }
}
`;
