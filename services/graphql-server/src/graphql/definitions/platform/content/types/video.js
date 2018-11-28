const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentVideo(input: ContentVideoQueryInput!): ContentVideo @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentVideo")
}

type ContentVideo implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
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
