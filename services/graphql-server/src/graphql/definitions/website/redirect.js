const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  websiteRedirect(input: WebsiteRedirectQueryInput!): WebsiteRedirect
}

type WebsiteRedirect {
  from: String!
  to: String!
  code: Int!
}

input WebsiteRedirectQueryInput {
  siteId: ObjectID
  from: String!
  params: JSON
}

`;
