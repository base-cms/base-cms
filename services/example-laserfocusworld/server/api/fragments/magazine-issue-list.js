const gql = require('graphql-tag');

module.exports = gql`

fragment MagazineIssueListFragment on MagazineIssue {
  id
  name
  description
  canonicalPath
  mailed
  coverImage {
    id
    src
  }
  digitalEditionUrl
  publication {
    id
    name
    description
    canonicalPath
    subscribeUrl
  }
}

`;
