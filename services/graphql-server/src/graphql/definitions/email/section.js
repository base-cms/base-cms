const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  emailSection(input: EmailSectionQueryInput!): EmailSection @findOne(model: "email.Section", using: { id: "_id" })
  emailSections(input: EmailSectionsQueryInput = {}): EmailSectionConnection! @findMany(model: "email.Section")
}

type EmailSection {
  # fields from platform.model::Section
  id: Int! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection
  description: String @projection
  fullName: String @projection

  # fields from trait.platform::StatusEnabled
  status: Int @projection

  # fields from trait.platform::Sequenceable
  sequence: Int @projection

  # fields directly on email.model::Section
  newsletter(input: EmailSectionNewsletterInput = {}): EmailNewsletter @projection(localField: "deployment") @refOne(loader: "platformProduct", localField: "deployment", criteria: "emailNewsletter")

  # fields from trait.platform::Content\SeoFields
  seoTitle: String @projection
  alias: String @projection
  redirects: [String]! @projection @arrayValue
  slug: String @projection
}

type EmailSectionConnection @projectUsing(type: "EmailSection") {
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
