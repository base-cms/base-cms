const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentProduct(input: ContentProductQueryInput!): ContentProduct @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentProduct")
}

type ContentProduct implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentProductConnection {
  totalCount: Int!
  edges: [ContentProductEdge]!
  pageInfo: PageInfo!
}

type ContentProductEdge {
  node: ContentProduct!
  cursor: String!
}

input ContentProductQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentProductSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
