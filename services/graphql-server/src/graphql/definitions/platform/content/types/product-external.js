const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentProductExternal(input: ContentProductExternalQueryInput!): ContentProductExternal @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentProductExternal")
}

type ContentProductExternal implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentProductExternalConnection {
  totalCount: Int!
  edges: [ContentProductExternalEdge]!
  pageInfo: PageInfo!
}

type ContentProductExternalEdge {
  node: ContentProductExternal!
  cursor: String!
}

input ContentProductExternalQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentProductExternalInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
