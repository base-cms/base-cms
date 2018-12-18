const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentVideo(input: ContentVideoQueryInput!): ContentVideo @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentVideo")
}

type ContentVideo implements Content & Authorable & Media @applyInterfaceFields {
  # fields directly on platform.model::Content\Video
  duration: Int @projection
  source: String @projection
  credit: String @projection
  embedCode: String @projection
  sourceId: String @projection
  sourceThumbnail: String @projection
}

type ContentVideoConnection {
  totalCount: Int!
  edges: [ContentVideoEdge]!
  pageInfo: PageInfo!
}

type ContentVideoEdge {
  node: ContentVideo!
  cursor: String!
}

input ContentVideoQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentVideoSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
