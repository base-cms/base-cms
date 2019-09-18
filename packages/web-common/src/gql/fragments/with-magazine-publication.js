const gql = require('graphql-tag');

module.exports = gql`

fragment WithMagazinePublicationFragment on MagazinePublication {
  id
}

`;
