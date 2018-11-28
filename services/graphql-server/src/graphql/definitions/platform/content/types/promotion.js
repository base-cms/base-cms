const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentPromotion(input: ContentPromotionQueryInput!): ContentPromotion @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentPromotion")
}

type ContentPromotion implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentPromotionQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
