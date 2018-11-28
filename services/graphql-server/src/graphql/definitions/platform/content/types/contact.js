const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentContact(input: ContentContactQueryInput!): ContentContact @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentContact")
}

type ContentContact implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentContactConnection {
  totalCount: Int!
  edges: [ContentContactEdge]!
  pageInfo: PageInfo!
}

type ContentContactEdge {
  node: ContentContact!
  cursor: String!
}

enum ContentContactAuthorType {
  author
  contributor
  photographer
}

enum ContentContactSortField {
  id
  name
  lastName
  firstName
  created
  updated
  published
}

input ContentContactQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentContactSortInput {
  field: ContentContactSortField = id
  order: SortOrder = desc
}

`;
