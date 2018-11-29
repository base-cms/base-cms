const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentEngineSpec(input: ContentEngineSpecQueryInput!): ContentEngineSpec @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentEngineSpec")
}

type ContentEngineSpec implements Content @applyInterfaceFields {
  # fields directly on platform.model::Content\EngineSpec
  products(input: ContentEngineSpecProductsInput = {}): ContentProductConnection! @refMany(model: "platform.Content", criteria: "contentProduct")
  fuel: String
  model: String
  certification: String
  aftertreatment: String
  horsepower: ContentEngineSpecMinMaxValue
  displacement: ContentEngineSpecMinMaxValue
  torque: ContentEngineSpecMinMaxValue
  width: ContentEngineSpecMinMaxValue
  length: ContentEngineSpecMinMaxValue
  height: ContentEngineSpecMinMaxValue
}

type ContentEngineSpecConnection {
  totalCount: Int!
  edges: [ContentEngineSpecEdge]!
  pageInfo: PageInfo!
}

type ContentEngineSpecEdge {
  node: ContentEngineSpec!
  cursor: String!
}

type ContentEngineSpecMinMaxValue {
  min: Float
  max: Float
  value: Float
}

input ContentEngineSpecQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentEngineSpecProductsInput {
  status: ModelStatus = active
  sort: ContentProductSortInput = {}
  pagination: PaginationInput = {}
}

input ContentEngineSpecSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
