const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  activeUser: User
}

extend type Mutation {
  login(input: UserLoginMutationInput!): UserAuthToken!
  logout: String! @requiresAuth
}

enum AuthRole {
  admin
  member
  restricted
}

type UserAuthToken {
  expires: Date!
  value: String!
}

input UserLoginMutationInput {
  username: String!
  password: String!
}

`;
