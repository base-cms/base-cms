const gql = require('graphql-tag');

module.exports = gql`

fragment MagazineLatestIssueQueryFragment on MagazineIssue {
  id
  name
  canonicalPath
  coverImage {
    id
    src
  }
  digitalEditionUrl
  publication {
    id
    canonicalPath
    subscribeUrl
  }
}

`;
