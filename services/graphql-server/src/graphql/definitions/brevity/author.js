const gql = require('graphql-tag');

module.exports = gql`

type BrevityAuthor {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  firstName: String @projection
  lastName: String @projection
  email: String @projection
}

`;
