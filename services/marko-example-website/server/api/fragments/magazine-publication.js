const gql = require('graphql-tag');

module.exports = gql`

fragment MagazinePublicationQueryFragment on MagazinePublication {
  id
  name
  description
  canonicalPath
}

`;
