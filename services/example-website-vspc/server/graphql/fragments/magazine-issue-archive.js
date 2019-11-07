const gql = require('graphql-tag');

module.exports = gql`

fragment MagazineIssueArchiveFragment on MagazineIssue {
  id
  name
  canonicalPath
  coverImage {
    id
    src
  }
  publication {
    id
    name
  }
}

`;
