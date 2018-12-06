const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  websiteSection(input: WebsiteSectionQueryInput!): WebsiteSection @findOne(model: "website.Section", using: { id: "_id" })
  websiteSectionAlias(input: WebsiteSectionAliasQueryInput!): WebsiteSection @findOne(model: "website.Section", using: { alias: "alias" })
  websiteSectionRedirect(input: WebsiteSectionRedirectQueryInput!): WebsiteSection @findOne(model: "website.Section", using: { alias: "redirects" })
  websiteSections(input: WebsiteSectionsQueryInput = {}): WebsiteSectionConnection! @findMany(model: "website.Section")
  rootWebsiteSections(input: RootWebsiteSectionsQueryInput = {}): WebsiteSectionConnection! @findMany(model: "website.Section", criteria: "rootWebsiteSection")
  websiteSectionsFromIds(input: WebsiteSectionsFromIdsQueryInput!): WebsiteSectionConnection! @findMany(model: "website.Section", using: { ids: "_id" })
}

type WebsiteSection {
  # fields from platform.model::Section
  id: Int! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection
  description: String @projection
  fullName: String @projection

  # fields from trait.platform::StatusEnabled
  status: Int @projection

  # fields from trait.platform::Sequenceable
  sequence: Int @projection

  # fields directly on website.model::Section
  site(input: WebsiteSectionSiteInput = {}): WebsiteSite @projection @refOne(model: "platform.Product", criteria: "websiteSite")
  parent(input: WebsiteSectionParentInput = {}): WebsiteSection @projection @refOne(model: "website.Section")
  children(input: WebsiteSectionChildrenInput = {}): WebsiteSectionConnection! @projection(localField: "_id") @refMany(model: "website.Section", localField: "_id", foreignField: "parent.$id")
  logo: AssetImage @projection @refOne(model: "platform.Asset", criteria: "assetImage")

  # fields from trait.platform::Content\SeoFields
  # metadata: WebsiteSectionMetadata! @sectionMetadata
  alias: String @projection
  redirects: [String]! @projection @arrayValue
  slug: String @projection
}

type WebsiteSectionConnection @projectUsing(type: "WebsiteSection") {
  totalCount: Int!
  edges: [WebsiteSectionEdge]!
  pageInfo: PageInfo!
}

type WebsiteSectionEdge {
  node: WebsiteSection!
  cursor: String!
}

enum WebsiteSectionSortField {
  id
  name
  fullName
  sequence
}

input WebsiteSectionQueryInput {
  status: ModelStatus = active
  id: Int!
}

input WebsiteSectionAliasQueryInput {
  status: ModelStatus = active
  alias: String!
}

input WebsiteSectionRedirectQueryInput {
  status: ModelStatus = active
  alias: String!
}

input WebsiteSectionsQueryInput {
  status: ModelStatus = active
  sort: WebsiteSectionSortInput = {}
  pagination: PaginationInput = {}
}

input RootWebsiteSectionsQueryInput {
  status: ModelStatus = active
  sort: WebsiteSectionSortInput = {}
  pagination: PaginationInput = {}
}

input WebsiteSectionsFromIdsQueryInput {
  ids: [Int!]
  sort: WebsiteSectionSortInput = {}
  pagination: PaginationInput = {}
}

input WebsiteSectionSortInput {
  field: WebsiteSectionSortField = id
  order: SortOrder = desc
}

input WebsiteSectionSiteInput {
  status: ModelStatus = active
}

input WebsiteSectionParentInput {
  status: ModelStatus = active
}

input WebsiteSectionChildrenInput {
  status: ModelStatus = active
  sort: WebsiteSectionSortInput = {}
  pagination: PaginationInput = {}
}

`;
