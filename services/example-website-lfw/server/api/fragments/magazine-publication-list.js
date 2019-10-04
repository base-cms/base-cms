const gql = require('graphql-tag');

module.exports = gql`

fragment MagazinePublicationListFragment on MagazinePublication {
  id
  name
  canonicalPath
}

`;
