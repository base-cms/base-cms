const gql = require('graphql-tag');

module.exports = gql`

type ContentContact implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")

  # fields directly on platform.model::Content\Contact
  # socialLinks: [EntityStubSocial]! @arrayValue
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

input ContentContactSortInput {
  field: ContentContactSortField = id
  order: SortOrder = desc
}

`;
