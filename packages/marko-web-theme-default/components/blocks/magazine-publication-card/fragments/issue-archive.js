const gql = require('graphql-tag');

module.exports = gql`

fragment MagazinePublicationCardIssueArchiveFragment on MagazineIssue {
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
