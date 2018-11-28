const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentEngineSpec(input: ContentEngineSpecQueryInput!): ContentEngineSpec @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentEngineSpec")
}

type ContentEngineSpec implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
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

input ContentEngineSpecQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentEngineSpecSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
