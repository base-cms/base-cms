const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentApparatus(input: ContentApparatusQueryInput!): ContentApparatus @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentApparatus")
}

type ContentApparatus implements Content & Authorable @applyInterfaceFields {
  # fields directly on platform.model::Content\Apparatus
  aerial: String
  email: String
  engine: String
  generator: String
  pump: String
  tank: String
  year: Int
  manufacturer: String
  transmission: String
  apparatusType: String
  chassisManufacturer(input: ContentApparatusChassisManufacturerInput = {}): ContentCompany @refOne(model: "platform.Content", criteria: "contentCompany")
  state: String
  group(input: ContentApparatusGroupInput = {}): ContentGroup @refOne(model: "platform.Content", criteria: "contentGroup")
  model: String
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
