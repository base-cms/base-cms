const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  activeUser: User @requiresAuth
}

enum AuthRole {
  admin
  member
  restricted
}

`;
