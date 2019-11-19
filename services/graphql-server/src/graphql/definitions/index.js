const gql = require('graphql-tag');
const email = require('./email');
const magazine = require('./magazine');
const platform = require('./platform');
const website = require('./website');
const googleDataApi = require('./google-data-api');

module.exports = gql`

scalar Date
scalar JSON
scalar ObjectID

directive @applyInterfaceFields on OBJECT
directive @arrayValue(localField: String) on FIELD_DEFINITION
directive @requiresAuth(role: AuthRole) on FIELD_DEFINITION

directive @findMany(
  model: String!, # The model name to query, e.g. platform.Content or website.Schedule.
  using: JSON, # A query input-to-document map. The key represents the input and the value represents the doc field to apply the input value to.
  withSite: Boolean = false, # When true, will apply the siteId context (if present) to the query.
  siteField: String = "site.$id", # The document field to apply the siteId to.
  criteria: String, # A query criteria key. If present in utils/criteria-for.js, will apply the criteria found to the query.
  queryBuilder: String, # A query builder key. If present in query-builders/index.js, will invoke the function and return the modified query object.
) on FIELD_DEFINITION

directive @findOne(
  model: String!,
  using: JSON,
  withSite: Boolean = false,
  siteField: String = "site.$id",
  criteria: String,
  queryBuilder: String,
) on FIELD_DEFINITION

directive @matchMany(model: String!, using: JSON, withSite: Boolean = false, siteField: String = "site.$id", criteria: String) on FIELD_DEFINITION
directive @momentFormat(localField: String) on FIELD_DEFINITION
directive @mutatedValue(localField: String) on FIELD_DEFINITION
directive @projection(localField: String, needs: [String] = []) on FIELD_DEFINITION
directive @projectUsing(type: String!) on OBJECT
directive @refMany(model: String!, localField: String, foreignField: String = "_id", criteria: String, withSite: Boolean = false, siteField: String = "site.$id", using: JSON) on FIELD_DEFINITION
directive @refOne(loader: String!, localField: String, withSite: Boolean = false, siteField: String = "site.$id", criteria: String) on FIELD_DEFINITION
directive @requiresProject(fields: [String] = []) on OBJECT | INTERFACE
directive @value(localField: String, fallbackField: String) on FIELD_DEFINITION
directive @deprecated(reason: String = "No longer supported") on FIELD_DEFINITION | ENUM_VALUE

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}

enum AuthRole {
  admin
  member
  restricted
}

enum SortOrder {
  asc
  desc
  values
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

enum SitemapChangeFreq {
  always
  hourly
  daily
  weekly
  monthly
  yearly
  never
}

input PaginationInput {
  limit: Int = 10
  skip: Int
  after: String
}

input FormatDate {
  format: String
  timezone: String
}

${email}
${magazine}
${platform}
${website}
${googleDataApi}

`;
