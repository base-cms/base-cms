const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  websiteRedirect(input: WebsiteRedirectQueryInput!): WebsiteRedirect
  websiteRedirects(input: WebsiteRedirectsQueryInput = {}): WebsiteRedirectConnection! @findMany(
    model: "website.Redirects"
    withSite: true
    siteField: "siteId"
  )
}

type WebsiteRedirect {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  site: WebsiteSite! @projection(localField: "siteId") @refOne(loader: "platformProduct", criteria: "websiteSite", localField: "siteId")
  from: String! @projection
  to: String! @projection
  code: Int! @projection
}

input WebsiteRedirectQueryInput {
  id: ObjectID
  siteId: ObjectID
  from: String
  params: JSON
}

type WebsiteRedirectConnection @projectUsing(type: "WebsiteRedirect") {
  totalCount: Int!
  edges: [WebsiteRedirectEdge]!
  pageInfo: PageInfo!
}

type WebsiteRedirectEdge {
  node: WebsiteRedirect!
  cursor: String!
}

enum WebsiteRedirectSortField {
  id
  from
}

input WebsiteRedirectsQueryInput {
  siteId: ObjectID
  sort: WebsiteRedirectSortInput = {}
  pagination: PaginationInput = {}
}

input WebsiteRedirectSortInput {
  field: WebsiteRedirectSortField = id
  order: SortOrder = desc
}

`;
