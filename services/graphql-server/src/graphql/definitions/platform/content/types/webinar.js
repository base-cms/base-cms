const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentWebinar(input: ContentWebinarQueryInput!): ContentWebinar @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentWebinar")
}

type ContentWebinar implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentWebinarConnection {
  totalCount: Int!
  edges: [ContentWebinarEdge]!
  pageInfo: PageInfo!
}

type ContentWebinarEdge {
  node: ContentWebinar!
  cursor: String!
}

input ContentWebinarQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentWebinarSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
