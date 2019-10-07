const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  websiteContext: WebsiteContext
}

type WebsiteContext {
  id: ObjectID! @value(localField: "_id")
  name: String!
  description: String
  host: String!
  origin: String!
  imageHost: String!
  assetHost: String!
  date: WebsiteContextDate!
  language: WebsiteContextLanguage!
}

type WebsiteContextDate {
  timezone: String! # tz database format, e.g. America/Chicago
  format: String! # moment.format()
  locale: String! # moment.locale()
}

type WebsiteContextLanguage {
  code: String!
  primaryCode: String! # ISO 639-1
  subCode: String # https://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
}

`;
