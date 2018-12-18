const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentInQuarters(input: ContentInQuartersQueryInput!): ContentInQuarters @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentInQuarters")
}

type ContentInQuarters implements Content & Authorable @applyInterfaceFields {
  # fields directly on platform.model::Content\InQuarters
  email: String @projection
  group(input: ContentInQuartersGroupInput = {}): ContentGroup @projection @refOne(loader: "platformContent", criteria: "contentGroup")
  state: String @projection
  year: Int @projection
  engines: Int @projection
  tankers: Int @projection
  brushTrucks: Int @projection
  aerials: Int @projection
  heavyRescues: Int @projection
  chiefs: Int @projection
  blsAls: Int @projection
  supportOther: Int @projection
  members: Int @projection
  servingArea: Int @projection
}

type ContentInQuartersConnection {
  totalCount: Int!
  edges: [ContentInQuartersEdge]!
  pageInfo: PageInfo!
}

type ContentInQuartersEdge {
  node: ContentInQuarters!
  cursor: String!
}

input ContentInQuartersQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentInQuartersGroupInput {
  status: ModelStatus = active
}

input ContentInQuartersSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
