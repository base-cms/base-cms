const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentGroup(input: ContentGroupQueryInput!): ContentGroup @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentGroup")
}

type ContentGroup implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentGroupConnection {
  totalCount: Int!
  edges: [ContentGroupEdge]!
  pageInfo: PageInfo!
}

type ContentGroupEdge {
  node: ContentGroup!
  cursor: String!
}

input ContentGroupQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentGroupSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
