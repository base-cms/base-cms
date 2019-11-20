const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  user(input: UserQueryInput!): User @findOne(model: "platform.User", using: { id: "_id" })
}

type User {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  email: String @projection
  name: String @projection(needs:["firstName", "lastName"])
  firstName: String @projection
  lastName: String @projection
  username: String @projection
  roles: [String!]! @projection @arrayValue @requiresAuth
}

input UserQueryInput {
  id: ObjectID!
}

`;
