const gql = require('graphql-tag');

module.exports = gql`

fragment MagazineLatestIssueQueryFragment on MagazineIssue {
  id
  name
  coverImage {
    id
    src
  }
  digitalEditionUrl
  publication {
    id
    subscribeUrl
  }
}

`;
