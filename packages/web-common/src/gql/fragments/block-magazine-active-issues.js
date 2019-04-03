const gql = require('graphql-tag');

module.exports = gql`

fragment BlockMagazineActiveIssuesFragment on MagazineIssue {
  id
  name
}

`;
