const gql = require('graphql-tag');

module.exports = gql`

fragment MagazineLatestIssueQueryFragment on MagazineIssue {
  id
  name
  coverImage {
    id
    src
  }
  publication {
    id
    subscribeUrl
  }
}

`;
