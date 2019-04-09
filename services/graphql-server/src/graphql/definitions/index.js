const gql = require('graphql-tag');
const email = require('./email');
const magazine = require('./magazine');
const platform = require('./platform');
const website = require('./website');
const sitemaps = require('./sitemaps');

module.exports = gql`

scalar Date
scalar JSON
scalar ObjectID

directive @applyInterfaceFields on OBJECT
directive @arrayValue(localField: String) on FIELD_DEFINITION
directive @findMany(model: String!, using: JSON, criteria: String) on FIELD_DEFINITION
directive @findOne(model: String!, using: JSON, criteria: String) on FIELD_DEFINITION
directive @matchMany(model: String!, using: JSON, criteria: String) on FIELD_DEFINITION
directive @momentFormat(localField: String, defaultFormat: String! = "YYYY-MM-DDTHH:mm:ssZ", defaultTimezone: String! = "America/Chicago") on FIELD_DEFINITION
directive @mutatedValue(localField: String) on FIELD_DEFINITION
directive @projection(localField: String, needs: [String] = []) on FIELD_DEFINITION
directive @projectUsing(type: String!) on OBJECT
directive @refMany(model: String!, localField: String, foreignField: String = "_id", criteria: String, using: JSON) on FIELD_DEFINITION
directive @refOne(loader: String!, localField: String, criteria: String) on FIELD_DEFINITION
directive @requiresProject(fields: [String] = []) on OBJECT | INTERFACE
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
  draft
  deleted
}

enum MatchPosition {
  contains
  starts
  ends
  exact
}

enum MatchWords {
  any
  all
}

input PaginationInput {
  limit: Int = 10
  skip: Int
  after: String
}

input FormatDate {
  format: String = "YYYY-MM-DDTHH:mm:ssZ"
  timezone: String = "America/Chicago"
}

${email}
${magazine}
${platform}
${website}
${sitemaps}

`;
