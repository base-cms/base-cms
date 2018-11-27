const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  websiteSite(input: WebsiteSiteQueryInput!): WebsiteSite @findOne(model: "platform.Product", using: { id: "_id" }, criteria: "websiteSite")
  websiteSites(input: WebsiteSitesQueryInput!): WebsiteSiteConnection! @findMany(model: "platform.Product", criteria: "websiteSite")
}

type WebsiteSite {
  # fields from platform.model::Product
  id: ObjectID! @value(localField: "_id")
  type: String!
  name: String
  fullName: String
  tagLine: String
  description: String
  logo: String

  # fields from platform.trait::StatusEnabled
  status: Int

  # fields directly on website.model::Product\Site
  sections(input: WebsiteSiteSectionsInput = {}): WebsiteSectionConnection! @refMany(model: "website.Section", localField: "_id", foreignField: "site.$id")
  # pages: [WebsitePage] # add args? @todo Add this model
  options(input: WebsiteSiteOptionsInput = {}): WebsiteOptionConnection! @refMany(model: "website.Option", localField: "_id", foreignField: "site.$id")
  url: String
  # socialFollow: [PlatformEntityStubSocial]! @arrayValue
  redirects: [String]! @arrayValue

  # fields that are new to GraphQL
  rootSections(input: WebsiteSiteRootSectionsInput = {}): WebsiteSectionConnection! @refMany(model: "website.Section", localField: "_id", foreignField: "site.$id", criteria: "rootWebsiteSection")
}

type WebsiteSiteConnection {
  totalCount: Int!
  edges: [WebsiteSiteEdge]!
  pageInfo: PageInfo!
}

type WebsiteSiteEdge {
  node: WebsiteSite!
  cursor: String!
}

enum WebsiteSiteSortField {
  id
  name
  fullName
}

input WebsiteSiteQueryInput {
  id: ObjectID!
  status: ModelStatus = active
}

input WebsiteSitesQueryInput {
  status: ModelStatus = active
  sort: WebsiteSiteSortInput = {}
  pagination: PaginationInput = {}
}

input WebsiteSiteOptionsInput {
  status: ModelStatus = active
  sort: WebsiteOptionSortInput = {}
  pagination: PaginationInput = {}
}

input WebsiteSiteSortInput {
  field: WebsiteSiteSortField = id
  order: SortOrder = desc
}

input WebsiteSiteSectionsInput {
  status: ModelStatus = active
  sort: WebsiteSectionSortInput = {}
  pagination: PaginationInput = {}
}

input WebsiteSiteRootSectionsInput {
  status: ModelStatus = active
  sort: WebsiteSectionSortInput = {}
  pagination: PaginationInput = {}
}

`;
