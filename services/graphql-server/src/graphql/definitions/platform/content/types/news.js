const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentNews(input: ContentNewsQueryInput!): ContentNews @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentNews")
}

type ContentNews implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentNewsConnection {
  totalCount: Int!
  edges: [ContentNewsEdge]!
  pageInfo: PageInfo!
}

type ContentNewsEdge {
  node: ContentNews!
  cursor: String!
}

input ContentNewsQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentNewsSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
