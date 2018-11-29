const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentCollection(input: ContentCollectionQueryInput!): ContentCollection @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentCollection")
}

type ContentCollection implements Content @applyInterfaceFields {
  # fields directly on platform.model::Content\Collection
  displayContentType: String
  collection(input: ContentCollectionCollectionInput = {}): ContentCollectionConnection! @refMany(model: "platform.Content", criteria: "assetCollection")
}

type ContentCollectionConnection {
  totalCount: Int!
  edges: [ContentCollectionEdge]!
  pageInfo: PageInfo!
}

type ContentCollectionEdge {
  node: ContentCollection!
  cursor: String!
}

input ContentCollectionQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentCollectionCollectionInput {
  status: ModelStatus = active
  sort: ContentCollectionSortInput = {}
  pagination: PaginationInput = {}
}

input ContentCollectionSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
