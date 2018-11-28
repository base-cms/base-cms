const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentWhitepaper(input: ContentWhitepaperQueryInput!): ContentWhitepaper @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentWhitepaper")
}

type ContentWhitepaper implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentWhitepaperConnection {
  totalCount: Int!
  edges: [ContentWhitepaperEdge]!
  pageInfo: PageInfo!
}

type ContentWhitepaperEdge {
  node: ContentWhitepaper!
  cursor: String!
}

input ContentWhitepaperQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentWhitepaperSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
