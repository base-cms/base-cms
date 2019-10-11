const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  websiteOption(input: WebsiteOptionQueryInput!): WebsiteOption @findOne(
    model: "website.Option",
    withSite: true,
    using: { id: "_id" }
  )
  websiteOptions(input: WebsiteOptionsQueryInput = {}): WebsiteOptionConnection! @findMany(
    model: "website.Option",
    withSite: true
  )
  websiteOptionsForSite(input: WebsiteOptionsForSiteQueryInput!): WebsiteOptionConnection! @deprecated(reason: "Use \`Query.websiteOptions\` with the \`siteId\` input instead") @findMany(
    model: "website.Option",
    using: { siteId: "site.$id" }
  )
}

type WebsiteOption {
  # fields directly from website.model::Option
  id: Int! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection
  description: String @projection
  site(input: WebsiteOptionSiteInput = {}): WebsiteSite @projection @refOne(loader: "platformProduct", criteria: "websiteSite")

  # fields from platform.trait::StatusEnabled
  status: Int @projection
}

type WebsiteOptionConnection @projectUsing(type: "WebsiteOption") {
  totalCount: Int!
  edges: [WebsiteOptionEdge]!
  pageInfo: PageInfo!
}

type WebsiteOptionEdge {
  node: WebsiteOption!
  cursor: String!
}

enum WebsiteOptionSortField {
  id
  name
}

input WebsiteOptionQueryInput {
  id: Int!
  status: ModelStatus = active
}

input WebsiteOptionSiteInput {
  status: ModelStatus = active
}

input WebsiteOptionsQueryInput {
  siteId: ObjectID
  status: ModelStatus = active
  sort: WebsiteOptionSortInput = {}
  pagination: PaginationInput = {}
}

input WebsiteOptionsForSiteQueryInput {
  siteId: ObjectID!
  status: ModelStatus = active
  sort: WebsiteOptionSortInput = {}
  pagination: PaginationInput = {}
}

input WebsiteOptionSortInput {
  field: WebsiteOptionSortField = id
  order: SortOrder = desc
}

input RelatedWebsiteOptionsInput {
  status: ModelStatus = active
  sort: WebsiteOptionSortInput = {}
  pagination: PaginationInput = {}
}

`;
