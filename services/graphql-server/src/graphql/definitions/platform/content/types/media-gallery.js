const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentMediaGallery(input: ContentMediaGalleryQueryInput!): ContentMediaGallery @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentMediaGallery")
}

type ContentMediaGallery implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentMediaGalleryConnection {
  totalCount: Int!
  edges: [ContentMediaGalleryEdge]!
  pageInfo: PageInfo!
}

type ContentMediaGalleryEdge {
  node: ContentMediaGallery!
  cursor: String!
}

input ContentMediaGalleryQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentMediaGallerySortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
