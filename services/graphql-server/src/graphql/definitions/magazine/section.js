const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  magazineSection(input: MagazineSectionQueryInput!): MagazineSection @findOne(model: "magazine.Section", using: { id: "_id" })
  magazineSections(input: MagazineSectionsQueryInput = {}): MagazineSectionConnection! @findMany(model: "magazine.Section")
  globalMagazineSections(input: GlobalMagazineSectionsQueryInput = {}): MagazineSectionConnection! @findMany(model: "magazine.Section", criteria: "globalMagazineSection")
  issueMagazineSections(input: IssueMagazineSectionsQueryInput = {}): MagazineSectionConnection! @findMany(model: "magazine.Section", criteria: "issueMagazineSection")
}

type MagazineSection {
  # fields from platform.model::Section
  id: Int! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection
  description: String @projection
  fullName: String @projection

  # fields from trait.platform::StatusEnabled
  status: Int @projection

  # fields from trait.platform::Sequenceable
  sequence: Int @projection

  # fields directly on magazine.model::Section
  publication(input: MagazineSectionPublicationInput = {}): MagazinePublication @projection @refOne(loader: "platformProduct", criteria: "magazinePublication")
  issue(input: MagazineSectionIssueInput = {}): MagazineIssue @projection @refOne(loader: "magazineIssue")

  # GraphQL only fields
  isGlobal: Boolean @projection(localField: "publication")
}

type MagazineSectionConnection @projectUsing(type: "MagazineSection") {
  totalCount: Int!
  edges: [MagazineSectionEdge]!
  pageInfo: PageInfo!
}

type MagazineSectionEdge {
  node: MagazineSection!
  cursor: String!
}

enum MagazineSectionSortField {
  id
  name
  fullName
  sequence
}

input MagazineSectionQueryInput {
  id: Int!
  status: ModelStatus = active
}

input MagazineSectionsQueryInput {
  status: ModelStatus = active
  sort: MagazineSectionSortInput = {}
  pagination: PaginationInput = {}
}

input GlobalMagazineSectionsQueryInput {
  status: ModelStatus = active
  sort: MagazineSectionSortInput = {}
  pagination: PaginationInput = {}
}

input IssueMagazineSectionsQueryInput {
  status: ModelStatus = active
  sort: MagazineSectionSortInput = {}
  pagination: PaginationInput = {}
}

input MagazineSectionPublicationInput {
  status: ModelStatus = active
}

input MagazineSectionIssueInput {
  status: ModelStatus = active
}

input MagazineSectionSortInput {
  field: MagazineSectionSortField = id
  order: SortOrder = desc
}

`;
