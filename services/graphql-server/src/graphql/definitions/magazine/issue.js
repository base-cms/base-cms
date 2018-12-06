const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  magazineIssue(input: MagazineIssueQueryInput!): MagazineIssue @findOne(model: "magazine.Issue", using: { id: "_id" })
  magazineIssues(input: MagazineIssuesQueryInput = {}): MagazineIssueConnection! @findMany(model: "magazine.Issue")
}

type MagazineIssue {
  # fields directly on platform.model::Issue
  id: Int! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection
  description: String @projection
  mailDate: Date @projection
  digitalEditionUrl: String @projection
  dedication: String @projection
  coverDescription: String @projection
  credit: String @projection
  publication(input: MagazineIssuePublicationInput = {}): MagazinePublication @projection @refOne(model: "platform.Product", criteria: "magazinePublication")
  sections(input: MagazineIssueSectionsInput = {}): MagazineSectionConnection! @projection(localField: "_id") @refMany(model: "magazine.Section", localField: "_id", foreignField: "issue.$id")
  coverImage: AssetImage @projection @refOne(model: "platform.Asset", criteria: "assetImage")
  redirects: [String]! @projection @arrayValue

  #fields from trait.platform::StatusEnabled
  status: Int @projection
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

enum MagazineIssueSortField {
  id
  name
  mailDate
}

input MagazineIssueQueryInput {
  id: Int!
  status: ModelStatus = active
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
