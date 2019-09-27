const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  websiteContext: WebsiteContext
}

type WebsiteContext {
  id: ObjectID! @value(localField: "_id")
  name: String!
  host: String!
  origin: String!
  imageHost: String!
  assetHost: String!
  language: WebsiteContextLanguage!
}

type WebsiteContextLanguage {
  code: String!
  primaryCode: String! # ISO 639-1
  subCode: String # https://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
}

`;
