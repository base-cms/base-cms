const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentReview(input: ContentReviewQueryInput!): ContentReview @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentReview")
}

type ContentReview implements Content & Authorable @applyInterfaceFields {
  # fields directly on platform.model::Content\Review
  rating: Float @projection
  product(input: ContentReviewProductInput = {}): ContentProduct @projection @refOne(loader: "platformContent", criteria: "contentProduct")
  summary: String @projection
}

type ContentReviewConnection {
  totalCount: Int!
  edges: [ContentReviewEdge]!
  pageInfo: PageInfo!
}

type ContentReviewEdge {
  node: ContentReview!
  cursor: String!
}

input ContentReviewQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentReviewProductInput {
  status: ModelStatus = active
}

input ContentReviewSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
