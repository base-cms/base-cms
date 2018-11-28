const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentReview(input: ContentReviewQueryInput!): ContentReview @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentReview")
}

type ContentReview implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentReviewQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
