const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  websiteRedirect(input: WebsiteRedirectQueryInput!): WebsiteRedirect
}

type WebsiteRedirect {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  site: WebsiteSite! @projection(localField: "siteId") @refOne(loader: "platformProduct", criteria: "websiteSite", localField: "siteId")
  from: String!
  to: String!
  code: Int!
}

input WebsiteRedirectQueryInput {
  id: ObjectID
  siteId: ObjectID
  from: String
  params: JSON
}

`;
