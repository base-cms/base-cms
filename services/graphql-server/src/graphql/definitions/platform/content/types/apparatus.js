const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentApparatus(input: ContentApparatusQueryInput!): ContentApparatus @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentApparatus")
}

type ContentApparatus implements Content & Authorable @applyInterfaceFields {
  # fields directly on platform.model::Content\Apparatus
  aerial: String @projection
  email: String @projection
  engine: String @projection
  generator: String @projection
  pump: String @projection
  tank: String @projection
  year: Int @projection
  manufacturer: String @projection
  transmission: String @projection
  apparatusType: String @projection
  chassisManufacturer(input: ContentApparatusChassisManufacturerInput = {}): ContentCompany @projection @refOne(loader: "platformContent", criteria: "contentCompany")
  state: String @projection
  group(input: ContentApparatusGroupInput = {}): ContentGroup @projection @refOne(loader: "platformContent", criteria: "contentGroup")
  model: String @projection
}

type ContentApparatusConnection {
  totalCount: Int!
  edges: [ContentApparatusEdge]!
  pageInfo: PageInfo!
}

type ContentApparatusEdge {
  node: ContentApparatus!
  cursor: String!
}

input ContentApparatusQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentApparatusChassisManufacturerInput {
  status: ModelStatus = active
}

input ContentApparatusGroupInput {
  status: ModelStatus = active
}

input ContentApparatusSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
