const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  magazineIssue(input: MagazineIssueQueryInput!): MagazineIssue @findOne(model: "magazine.Issue", using: { id: "_id" })
  magazineIssues(input: MagazineIssuesQueryInput = {}): MagazineIssueConnection! @findMany(model: "magazine.Issue")
  magazineActiveIssues(input: MagazineActiveIssuesQueryInput = {}): MagazineIssueConnection! @findMany(model: "magazine.Issue", criteria: "magazineActiveIssues", using: { publicationId: "publication.$id" })
  magazineLatestIssue(input: MagazineLatestIssueQueryInput!): MagazineIssue
}

type MagazineIssue {
  # fields directly on platform.model::Issue
  id: Int! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection
  description: String @projection
  mailed: Date @projection(localField: "mailDate") @value(localField: "mailDate")
  digitalEditionUrl: String @projection
  dedication: String @projection
  coverDescription: String @projection
  credit: String @projection
  publication(input: MagazineIssuePublicationInput = {}): MagazinePublication @projection @refOne(loader: "platformProduct", criteria: "magazinePublication")
  sections(input: MagazineIssueSectionsInput = {}): MagazineSectionConnection! @projection(localField: "_id") @refMany(model: "magazine.Section", localField: "_id", foreignField: "issue.$id")
  coverImage: AssetImage @projection @refOne(loader: "platformAsset", criteria: "assetImage")
  redirects: [String]! @projection @arrayValue

  #fields from trait.platform::StatusEnabled
  status: Int @projection

  # GraphQL only fields
  metadata: MagazineIssueMetadata! @projection(localField: "fullName", needs: ["description", "seoTitle"])
  mailDate(input: FormatDate = {}): String @projection(localField: "mailDate") @momentFormat(localField: "mailDate")
  canonicalPath: String! @projection(localField: "_id")
}

type MagazineIssueConnection @projectUsing(type: "MagazineIssue") {
  totalCount: Int!
  edges: [MagazineIssueEdge]!
  pageInfo: PageInfo!
}

type MagazineIssueEdge {
  node: MagazineIssue!
  cursor: String!
}

type MagazineIssueMetadata {
  title: String
  description: String
}

enum MagazineIssueSortField {
  id
  name
  mailDate
}

input MagazineIssueQueryInput {
  id: Int!
  status: ModelStatus = active
}

input MagazineLatestIssueQueryInput {
  publicationId: ObjectID!
  status: ModelStatus = active
  sort: MagazineIssueSortInput = { field: mailDate, order: desc }
}

input MagazineActiveIssuesQueryInput {
  publicationId: ObjectID!
  sort: MagazineIssueSortInput = { field: mailDate, order: desc }
  pagination: PaginationInput = {}
}

input MagazineIssuesQueryInput {
  status: ModelStatus = active
  sort: MagazineIssueSortInput = {}
  pagination: PaginationInput = {}
}

input MagazineIssuePublicationInput {
  status: ModelStatus = active
}

input MagazineIssueSectionsInput {
  status: ModelStatus = active
  sort: WebsiteSectionSortInput = {}
  pagination: PaginationInput = {}
}

input MagazineIssueSortInput {
  field: MagazineIssueSortField = id
  order: SortOrder = desc
}

`;
