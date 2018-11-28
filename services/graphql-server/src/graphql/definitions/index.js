const gql = require('graphql-tag');
const email = require('./email');
const magazine = require('./magazine');
const platform = require('./platform');
const website = require('./website');

module.exports = gql`

scalar Date
scalar JSON
scalar ObjectID

directive @applyInterfaceFields on OBJECT
directive @arrayValue(localField: String) on FIELD_DEFINITION
directive @findMany(model: String!, using: JSON, criteria: String) on FIELD_DEFINITION
directive @findOne(model: String!, using: JSON, criteria: String) on FIELD_DEFINITION
directive @mutatedValue(localField: String) on FIELD_DEFINITION
directive @refMany(model: String!, localField: String, foreignField: String = "_id", criteria: String) on FIELD_DEFINITION
directive @refOne(model: String!, localField: String, foreignField: String = "_id", criteria: String) on FIELD_DEFINITION
directive @value(localField: String, fallbackField: String) on FIELD_DEFINITION

type Query {
  ping: String!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}

enum SortOrder {
  asc
  desc
}

enum ModelStatus {
  any
  active
  deleted
}

input PaginationInput {
  limit: Int = 10
  after: String
}

${email}
${magazine}
${platform}
${website}

`;
