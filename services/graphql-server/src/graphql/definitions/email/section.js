const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  emailSection(input: EmailSectionQueryInput!): EmailSection @findOne(model: "email.Section", using: { id: "_id" })
  emailSections(input: EmailSectionsQueryInput = {}): EmailSectionConnection! @findMany(model: "email.Section")
}

type EmailSection {
  # fields from platform.model::Section
  id: Int! @value(localField: "_id")
  name: String
  description: String
  fullName: String

  # fields from trait.platform::StatusEnabled
  status: Int

  # fields from trait.platform::Sequenceable
  sequence: Int

  # fields directly on email.model::Section
  newsletter(input: EmailSectionNewsletterInput = {}): EmailNewsletter @refOne(model: "platform.Product", localField: "deployment", criteria: "emailNewsletter")

  # fields from trait.platform::Content\SeoFields
  seoTitle: String
  alias: String
  redirects: [String]! @arrayValue
  slug: String
}

type EmailSectionConnection {
  totalCount: Int!
  edges: [EmailSectionEdge]!
  pageInfo: PageInfo!
}

type EmailSectionEdge {
  node: EmailSection!
  cursor: String!
}

enum EmailSectionSortField {
  id
  name
  fullName
  sequence
}

input EmailSectionQueryInput {
  id: Int!
  status: ModelStatus = active
}

input EmailSectionsQueryInput {
  status: ModelStatus = active
  sort: EmailSectionSortInput = {}
  pagination: PaginationInput = {}
}

input EmailSectionNewsletterInput {
  status: ModelStatus = active
}

input EmailSectionSortInput {
  field: EmailSectionSortField = id
  order: SortOrder = desc
}

`;
