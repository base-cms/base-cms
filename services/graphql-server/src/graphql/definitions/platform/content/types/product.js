const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentProduct(input: ContentProductQueryInput!): ContentProduct @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentProduct")
}

type ContentProduct implements Content & PrimaryCategory & Inquirable @applyInterfaceFields {
  # fields directly on platform.model::Content\Product
  bodyOriginal: String @projection
  productUrl: String @projection
  iTunesUrl: String @projection
  googlePlayUrl: String @projection
  downloadUrl: String @projection
  website: String @projection
  url360: String @projection
  contentStatus: String @projection

  # fields directly on platform.model::Content\Product mutations
  headline: String @projection(localField: "mutations.Magazine.headline") @value(localField: "mutations.Magazine.headline")
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
