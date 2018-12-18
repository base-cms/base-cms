const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentContact(input: ContentContactQueryInput!): ContentContact @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentContact")
}

type ContentContact implements Content & Contactable & Addressable @applyInterfaceFields {
  # fields directly on platform.model::Content\Contact
  socialLinks: [EntityStubSocial]! @projection @arrayValue

  # GraphQL-only fields
  # @todo Implement
  # @see Cygnus\ApplicationBundle\Icarus\BlockHandler\ContentAuthorQuery
  ownedContent(input: ContentContactOwnedContentInput = {}): ContentConnection!
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

# @todo Implement.
input ContentContactOwnedContentInput {
  type: ContentContactAuthorType # a null value means all types
  excludeContentTypes: [ContentType]! = []
  includeContentTypes: [ContentType]! = []
  requiresImage: Boolean = false
  sort: ContentSortInput = {}
  pagination: PaginationInput = {}
}

input ContentContactSortInput {
  field: ContentContactSortField = id
  order: SortOrder = desc
}

`;
