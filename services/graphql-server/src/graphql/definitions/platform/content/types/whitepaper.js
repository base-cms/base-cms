const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentWhitepaper(input: ContentWhitepaperQueryInput!): ContentWhitepaper @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentWhitepaper")
}

type ContentWhitepaper implements Content & Authorable & Media @applyInterfaceFields {
  # fields directly on platform.model::Content\Whitepaper
  bodyOriginal: String
  editors(input: ContentWhitepaperEditorsInput = {}): ContentContactConnection! @refMany(model: "platform.Content", criteria: "contentContact")
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

input ContentWhitepaperEditorsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input ContentWhitepaperSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
