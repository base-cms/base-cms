const gql = require('graphql-tag');

module.exports = gql`

fragment WithMagazineIssueFragment on MagazineIssue {
  id
}

`;
