const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  emailNewsletter(input: EmailNewsletterQueryInput!): EmailNewsletter @findOne(model: "platform.Product", using: { id: "_id" }, criteria: "emailNewsletter")
  emailNewsletters(input: EmailNewslettersQueryInput = {}): EmailNewsletterConnection! @findMany(model: "platform.Product", criteria: "emailNewsletter")
}

type EmailNewsletter {
  # fields from platform.model::Product
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection
  fullName: String @projection
  tagLine: String @projection
  description: String @projection
  logo: String @projection

  # fields from platform.trait::StatusEnabled
  status: Int @projection

  # fields from email.model::Product
  provider: EmailProductStubProvider @projection
  sourceProvider: EmailProductStubHtmlSourceProvider @projection
  defaultTesters: [EmailCampaignTestRecipient]! @projection @arrayValue
  defaultFromName: String @projection
  defaultSubjectLine: String @projection

  # fields directly on email.model::Product\Newsletter
  parent(input: EmailNewsletterParentInput = {}): EmailNewsletter @projection @refOne(loader: "platformProducts", criteria: "emailNewsletter")
  sections(input: EmailNewsletterSectionsInput = {}): EmailSectionConnection! @projection(localField: "_id") @refMany(model: "email.Section", localField: "_id", foreignField: "deployment.$id")
  alias: String @projection
  usesDeploymentDates: Boolean @projection
  teaser: String @projection
}

type EmailNewsletterConnection @projectUsing(type: "EmailNewsletter") {
  totalCount: Int!
  edges: [EmailNewsletterEdge]!
  pageInfo: PageInfo!
}

type EmailNewsletterEdge {
  node: EmailNewsletter!
  cursor: String!
}

type EmailProductStubProvider {
  type: String
  providerId: String
  attributes: JSON
}

type EmailProductStubHtmlSourceProvider {
  handlerKey: String
  host: String
  path: String
}

enum EmailNewsletterSortField {
  id
  name
  fullName
}

input EmailNewsletterQueryInput {
  id: ObjectID!
  status: ModelStatus = active
}

input EmailNewslettersQueryInput {
  status: ModelStatus = active
  sort: EmailNewsletterSortInput = {}
  pagination: PaginationInput = {}
}

input EmailNewsletterParentInput {
  status: ModelStatus = active
}

input EmailNewsletterSectionsInput {
  status: ModelStatus = active
  sort: EmailSectionSortInput = {}
  pagination: PaginationInput = {}
}

input EmailNewsletterSortInput {
  field: EmailNewsletterSortField = id
  order: SortOrder = desc
}

`;
