const gql = require('graphql-tag');

module.exports = gql`

fragment WithMagazineSubscribeUrlFragment on MagazinePublication {
  id
  name
  description
  subscribeUrl
}

`;
