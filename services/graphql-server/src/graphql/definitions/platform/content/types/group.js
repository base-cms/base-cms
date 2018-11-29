const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentGroup(input: ContentGroupQueryInput!): ContentGroup @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentGroup")
}

type ContentGroup implements Content @applyInterfaceFields {
  # fields directly on platform.model::Content\Group
  parentGroup(input: ContentGroupParentGroupInput = {}): ContentGroup @refOne(model: "platform.Content", criteria: "contentGroup")
  areaTypes: [String]! @arrayValue
  inQuarters(input: ContentGroupInQuartersInput = {}): ContentInQuartersConnection! @refMany(model: "platform.Content", localField: "_id", foreignField: "group", criteria: "contentInQuarters")
  apparatuses(input: ContentGroupAppratusesInput = {}): ContentApparatusConnection! @refMany(model: "platform.Content", localField: "_id", foreignField: "group", criteria: "contentApparatus")
  services: [String]! @arrayValue
  annualBudget: [String]! @arrayValue
  groupType: String
  municipality: String
  personnel: [String]! @arrayValue
  chief: String
  activeCareer: Int
  nonActiveCareer: Int
  activeVolunteer: Int
  nonActiveVolunteer: Int
  activePaidPerCall: Int
  nonActivePaidPerCall: Int
  annualCallStatistics: Int
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
