const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentProduct(input: ContentProductQueryInput!): ContentProduct @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentProduct")
}

type ContentProduct implements Content @applyInterfaceFields {
  # fields directly on platform.model::Content\Product
  bodyOriginal: String
  productUrl: String
  iTunesUrl: String
  googlePlayUrl: String
  downloadUrl: String
  website: String
  url360: String
  contentStatus: String

  # fields directly on platform.model::Content\Product mutations
  primaryCategory: String @value(localField: "mutations.Website.primaryCategory")
  headline: String @value(localField: "mutations.Magazine.headline")
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
