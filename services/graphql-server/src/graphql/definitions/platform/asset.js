const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  assetImage(input: AssetImageQueryInput!): AssetImage @findOne(model: "platform.Asset", using: { id: "_id" }, criteria: "assetImage")
}

type AssetImage {
  # from platform.model::Asset
  id: ObjectID! @value(localField: "_id")
  name: String
  touched: Date

  # from platform.model::Asset\Image
  filePath: String
  fileName: String
  source: AssetImageSource
  caption: String
  credit: String
  cropDimensions: AssetImageCrop

  # from platform.model::Asset\Image mutations
  approvedWebsite: Boolean @value(localField: "mutations.Website.approved")
  approvedMagazine: Boolean @value(localField: "mutations.Magazine.approved")

  #GraphQL specific fields
  src(input: AssetImageSrcInput = {}): String!
  alt: String!
}

type AssetImageConnection {
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

input AssetImageSrcInput {
  host: String!
  size: String = "640w"
  aspectRatio: String = "16x9"
}

input AssetImageSortInput {
  field: AssetImageSortField = id
  order: SortOrder = desc
}

`;
