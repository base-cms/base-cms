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

extend type Mutation {
  createWebsiteRedirect(input: CreateWebsiteRedirectMutationInput!): WebsiteRedirect! @requiresAuth
}

type WebsiteRedirect {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  site: WebsiteSite! @projection(localField: "siteId") @refOne(loader: "platformProduct", criteria: "websiteSite", localField: "siteId")
  "The URL path to redirect from, such as \`/some/path\`"
  from: String! @projection
  "The URI that should be redirected to, such as \`https://google.com/search\` or \`/new/path\`"
  to: String! @projection
  "The HTTP status code that should be used when redirecting. By default this value is 301"
  code: Int! @projection
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

input WebsiteRedirectQueryInput {
  id: ObjectID
  siteId: ObjectID
  from: String
  params: JSON
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

input CreateWebsiteRedirectMutationInput {
  "The site that this redirect will be valid for"
  siteId: ObjectID!
  payload: CreateWebsiteRedirectMutationPayloadInput!
}

input CreateWebsiteRedirectMutationPayloadInput {
  "The URL path to redirect from, such as \`/some/path\`"
  from: String!
  "The URI that should be redirected to, such as \`https://google.com/search\` or \`/new/path\`"
  to: String!
  "The HTTP status code that should be used when redirecting. By default this value is 301"
  code: Int = 301
}

`;
