const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentInfographic(input: ContentInfographicQueryInput!): ContentInfographic @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentInfographic")
}

type ContentInfographic implements Content & Media @applyInterfaceFields {
  id: Int! @projection @value(localField: "_id")
}

type ContentInfographicConnection {
  totalCount: Int!
  edges: [ContentInfographicEdge]!
  pageInfo: PageInfo!
}

type ContentInfographicEdge {
  node: ContentInfographic!
  cursor: String!
}

input ContentInfographicQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentInfographicSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
