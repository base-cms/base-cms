const gql = require('graphql-tag');

module.exports = gql`

query GetActiveUser {
  activeAppUser {
    id
    email
    givenName
    familyName
  }
}

`;
