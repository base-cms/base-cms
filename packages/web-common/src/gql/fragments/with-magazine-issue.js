const gql = require('graphql-tag');

module.exports = gql`

fragment WithMagazineIssueFragment on MagazineIssue {
  id
  name
  description
  coverImage {
    src
  }
  canonicalPath
  metadata {
    title
    description
  }
}

`;
