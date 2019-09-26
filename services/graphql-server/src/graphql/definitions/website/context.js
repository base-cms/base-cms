const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  websiteContext: WebsiteContext
}

type WebsiteContext {
  id: ObjectID! @value(localField: "_id")
  name: String
  url: String
  origin: String
  language: String # ISO 639-1
}

`;
