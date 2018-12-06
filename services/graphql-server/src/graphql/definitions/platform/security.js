const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  user(input: UserQueryInput!): User @findOne(model: "platform.User", using: { id: "_id" })
}

type User {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  email: String @projection
  firstName: String @projection
  lastName: String @projection
  username: String @projection
}

input UserQueryInput {
  id: ObjectID!
}

`;
