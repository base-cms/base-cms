const gql = require('graphql-tag');

module.exports = gql`

fragment MagazineIssuePageFragment on MagazineIssue {
  id
  name
  description
  coverDescription
  credit
  digitalEditionUrl
  canonicalPath
  metadata {
    title
    description
  }
  coverImage {
    id
    src
  }
  publication {
    id
    name
    description
    subscribeUrl
    canonicalPath
  }
}

`;
