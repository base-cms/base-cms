const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentInQuarters(input: ContentInQuartersQueryInput!): ContentInQuarters @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentInQuarters")
}

type ContentInQuarters implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentInQuartersConnection {
  totalCount: Int!
  edges: [ContentInQuartersEdge]!
  pageInfo: PageInfo!
}

type ContentInQuartersEdge {
  node: ContentInQuarters!
  cursor: String!
}

input ContentInQuartersQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentInQuartersSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
