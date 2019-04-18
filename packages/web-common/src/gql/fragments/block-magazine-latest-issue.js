const gql = require('graphql-tag');

module.exports = gql`

fragment BlockMagazineLatestIssueFragment on MagazineIssue {
  id
  name
  canonicalPath
}

`;
