const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentInQuarters(input: ContentInQuartersQueryInput!): ContentInQuarters @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentInQuarters")
}

type ContentInQuarters implements Content & Authorable @applyInterfaceFields {
  # fields directly on platform.model::Content\InQuarters
  email: String
  group(input: ContentInQuartersGroupInput = {}): ContentGroup @refOne(loader: "platformContent", criteria: "contentGroup")
  state: String
  year: Int
  engines: Int
  tankers: Int
  brushTrucks: Int
  aerials: Int
  heavyRescues: Int
  chiefs: Int
  blsAls: Int
  supportOther: Int
  members: Int
  servingArea: Int
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
