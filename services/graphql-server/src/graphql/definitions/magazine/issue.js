const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  magazineIssue(input: MagazineIssueQueryInput!): MagazineIssue @findOne(model: "magazine.Issue", using: { id: "_id" })
  magazineIssues(input: MagazineIssuesQueryInput = {}): MagazineIssueConnection! @findMany(model: "magazine.Issue")
}

type MagazineIssue {
  # fields directly on platform.model::Issue
  id: Int! @value(localField: "_id")
  name: String
  description: String
  mailDate: Date
  digitalEditionUrl: String
  dedication: String
  coverDescription: String
  credit: String
  publication(input: MagazineIssuePublicationInput = {}): MagazinePublication @refOne(model: "platform.Product", criteria: "magazinePublication")
  sections(input: MagazineIssueSectionsInput = {}): MagazineSectionConnection! @refMany(model: "magazine.Section", localField: "_id", foreignField: "issue.$id")
  coverImage: AssetImage @refOne(model: "platform.Asset", criteria: "assetImage")
  redirects: [String]! @arrayValue

  #fields from trait.platform::StatusEnabled
  status: Int
}

type MagazineIssueConnection {
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
