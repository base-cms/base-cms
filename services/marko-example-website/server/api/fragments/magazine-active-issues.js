const gql = require('graphql-tag');

module.exports = gql`

fragment MagazineActiveIssueQueryFragment on MagazineIssue {
  id
  name
  coverImage {
    id
    src
  }
  mailDate(input:{format:"YYYY-MM"})
}

`;
