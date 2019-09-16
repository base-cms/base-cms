const gql = require('graphql-tag');

module.exports = gql`

fragment MagazinePublicationPageFragment on MagazinePublication {
  id
  name
  description
  canonicalPath
}

`;
