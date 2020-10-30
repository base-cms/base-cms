const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentPromotion(input: ContentPromotionQueryInput!): ContentPromotion @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentPromotion")
}

extend type Mutation {
  createContentPromotion(input: CreateContentPromotionMutationInput!): ContentPromotion! @requiresAuth
  updateContentPromotion(input: UpdateContentPromotionMutationInput!): ContentPromotion! @requiresAuth
  updateContentPromotionImages(input: UpdateContentPromotionImagesMutationInput!): ContentPromotion! @requiresAuth
}

type ContentPromotion implements Content @applyInterfaceFields {
  # fields directly on platform.model::Content\Promotion
  linkText: String @projection
  linkUrl: String @projection
}

type ContentPromotionConnection {
  totalCount: Int!
  edges: [ContentPromotionEdge]!
  pageInfo: PageInfo!
}

type ContentPromotionEdge {
  node: ContentPromotion!
  cursor: String!
}

input ContentPromotionQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentPromotionSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

input CreateContentPromotionMutationInput {
  payload: CreateContentPromotionPayloadMutationInput = {}
}

input CreateContentPromotionPayloadMutationInput {
  linkText: String
  linkUrl: String
  companyId: Int!
  name: String
  status: Int = 1
  primarySectionId: Int!
}

input UpdateContentPromotionMutationInput {
  id: Int!
  payload: UpdateContentPromotionPayloadMutationInput = {}
}

input UpdateContentPromotionPayloadMutationInput {
  linkText: String
  linkUrl: String
  companyId: String
  name: String
  status: Int
}

input UpdateContentPromotionImagesMutationInput {
  id: Int!
  payload: UpdateContentPromotionImagesPayloadMutationInput = {}
}

input UpdateContentPromotionImagesPayloadMutationInput {
  primaryImageId: ObjectID
  imageIds: [ObjectID!]
}
`;
