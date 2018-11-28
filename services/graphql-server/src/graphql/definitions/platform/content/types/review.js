const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentReview(input: ContentReviewQueryInput!): ContentReview @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentReview")
}

type ContentReview implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
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

input ContentReviewSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
