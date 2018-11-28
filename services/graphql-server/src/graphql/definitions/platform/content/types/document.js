const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentDocument(input: ContentDocumentQueryInput!): ContentDocument @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentDocument")
}

type ContentDocument implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentDocumentConnection {
  totalCount: Int!
  edges: [ContentDocumentEdge]!
  pageInfo: PageInfo!
}

type ContentDocumentEdge {
  node: ContentDocument!
  cursor: String!
}

input ContentDocumentQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentDocumentSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
