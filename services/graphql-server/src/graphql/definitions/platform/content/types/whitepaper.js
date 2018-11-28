const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentWhitepaper(input: ContentWhitepaperQueryInput!): ContentWhitepaper @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentWhitepaper")
}

type ContentWhitepaper implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentWhitepaperQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
