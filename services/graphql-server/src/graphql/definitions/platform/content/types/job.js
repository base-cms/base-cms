const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentJob(input: ContentJobQueryInput!): ContentJob @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentJob")
}

type ContentJob implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentJobConnection {
  totalCount: Int!
  edges: [ContentJobEdge]!
  pageInfo: PageInfo!
}

type ContentJobEdge {
  node: ContentJob!
  cursor: String!
}

input ContentJobQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentJobSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
