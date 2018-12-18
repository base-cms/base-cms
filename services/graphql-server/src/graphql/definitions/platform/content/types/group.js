const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentGroup(input: ContentGroupQueryInput!): ContentGroup @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentGroup")
}

type ContentGroup implements Content @applyInterfaceFields {
  # fields directly on platform.model::Content\Group
  parentGroup(input: ContentGroupParentGroupInput = {}): ContentGroup @projection @refOne(loader: "platformContent", criteria: "contentGroup")
  areaTypes: [String]! @projection @arrayValue
  inQuarters(input: ContentGroupInQuartersInput = {}): ContentInQuartersConnection! @projection(localField: "_id") @refMany(model: "platform.Content", localField: "_id", foreignField: "group", criteria: "contentInQuarters")
  apparatuses(input: ContentGroupAppratusesInput = {}): ContentApparatusConnection! @projection(localField: "_id") @refMany(model: "platform.Content", localField: "_id", foreignField: "group", criteria: "contentApparatus")
  services: [String]! @projection @arrayValue
  annualBudget: [String]! @projection @arrayValue
  groupType: String @projection
  municipality: String @projection
  personnel: [String]! @projection @arrayValue
  chief: String @projection
  activeCareer: Int @projection
  nonActiveCareer: Int @projection
  activeVolunteer: Int @projection
  nonActiveVolunteer: Int @projection
  activePaidPerCall: Int @projection
  nonActivePaidPerCall: Int @projection
  annualCallStatistics: Int @projection
}

type ContentGroupConnection {
  totalCount: Int!
  edges: [ContentGroupEdge]!
  pageInfo: PageInfo!
}

type ContentGroupEdge {
  node: ContentGroup!
  cursor: String!
}

input ContentGroupQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentGroupParentGroupInput {
  status: ModelStatus = active
}

input ContentGroupInQuartersInput {
  status: ModelStatus = active
  sort: ContentInQuartersSortInput = {}
  pagination: PaginationInput = {}
}

input ContentGroupAppratusesInput {
  status: ModelStatus = active
  sort: ContentApparatusSortInput = {}
  pagination: PaginationInput = {}
}

input ContentGroupSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
