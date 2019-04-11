const gql = require('graphql-tag');

module.exports = gql`

fragment BlockMagazinePublicationsFragment on MagazinePublication {
  id
  name
  description
  canonicalPath
}

`;
