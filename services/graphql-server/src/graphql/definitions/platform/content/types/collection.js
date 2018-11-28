const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentCollection(input: ContentCollectionQueryInput!): ContentCollection @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentCollection")
}

type ContentCollection implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
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

input ContentCollectionSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
