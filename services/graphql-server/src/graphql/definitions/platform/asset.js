const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  assetImage(input: AssetImageQueryInput!): AssetImage @findOne(model: "platform.Asset", using: { id: "_id" }, criteria: "assetImage")
}

extend type Mutation {
  updateAssetImage(input: UpdateAssetImageMutationInput!): AssetImage! @requiresAuth
  createAssetImageFromUrl(input: CreateAssetImageFromUrlMutationInput!): AssetImage! @requiresAuth
}

enum AssetImageDisplay {
  left
  right
  center
  none
}

type AssetImage {
  # from platform.model::Asset
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection
  touched: Date @projection

  # from platform.model::Asset\Image
  filePath: String @projection
  fileName: String @projection
  source: AssetImageSource @projection
  displayName: String @projection
  caption: String @projection
  credit: String @projection
  cropDimensions: AssetImageCrop @projection
  isLogo: Boolean @projection
  body: String @projection

  primaryImageDisplay: AssetImageDisplay! @projection

  # from platform.model::Asset\Image mutations
  approvedWebsite: Boolean @projection(localField: "mutations.Website.approved") @value(localField: "mutations.Website.approved")
  approvedMagazine: Boolean @projection(localField: "mutations.Magazine.approved") @value(localField: "mutations.Magazine.approved")

  # GraphQL specific fields
  src(input: AssetImageSrcInput = {}): String! @projection(localField: "fileName", needs: ["filePath", "cropDimensions", "isLogo", "source.width", "source.height"])
  alt: String! @projection(localField: "name", needs: ["caption", "fileName"])
  cropRectangle: AssetImageCropRectangle! @projection(localField: "cropDimensions", needs: ["source.width", "source.height", "fileName", "filePath"])
}

type AssetImageConnection @projectUsing(type: "AssetImage") {
  totalCount: Int!
  edges: [AssetImageEdge]!
  pageInfo: PageInfo!
}

type AssetImageEdge {
  node: AssetImage!
  cursor: String!
}

type AssetImageSource {
  location: String
  name: String
  width: Int
  height: Int
  processed: Boolean
}

type AssetImageCropRectangle {
  x: Int!
  y: Int!
  width: Int!
  height: Int!
}

type AssetImageCrop {
  x1: Int
  x2: Int
  y1: Int
  y2: Int
  aspectRatio: String
}

enum AssetImageSortField {
  id
  name
  touched
  filePath
  fileName
}

input AssetImageQueryInput {
  id: ObjectID!
}

input UpdateAssetImageMutationInput {
  id: ObjectID!
  payload: UpdateAssetImageMutationPayloadInput = {}
}

input UpdateAssetImageMutationPayloadInput {
  name: String
  filePath: String
  fileName: String
  isLogo: Boolean
}

input CreateAssetImageFromUrlMutationInput {
  url: String!
}

input AssetImageSortInput {
  field: AssetImageSortField = id
  order: SortOrder = desc
}

input AssetImageSrcInput {
  options: JSON
  useCropRectangle: Boolean = false
}

`;
