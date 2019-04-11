const gql = require('graphql-tag');

module.exports = gql`

fragment WithMagazinePublicationFragment on MagazinePublication {
  id
  name
  description
  canonicalPath
  # metadata {
  #   title
  #   description
  # }
}

`;
