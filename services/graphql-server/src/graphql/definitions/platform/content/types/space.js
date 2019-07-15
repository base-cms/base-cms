const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentSpace(input: ContentSpaceQueryInput!): ContentSpace @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentSpace")
}

type ContentSpace implements Content @applyInterfaceFields {
  # fields directly on platform.model::Content\Space
  venue(input: ContentSpaceVenueInput = {}): ContentVenue @projection @refOne(loader: "platformContent" criteria: "contentSpace")
  floorPlan: AssetImage @refOne(localField: "floorPlanImage", loader: "platformAsset", criteria: "assetImage")
  capacityMin: String @projection
  capacityMaxSeated: String @projection
  capacityMaxStanding: String @projection
  area: String @projection
}

input ContentSpaceQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentSpaceVenueInput {
  status: ModelStatus = active
}

`;
