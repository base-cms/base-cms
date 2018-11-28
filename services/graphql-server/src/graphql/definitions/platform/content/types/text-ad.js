const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentTextAd(input: ContentTextAdQueryInput!): ContentTextAd @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentTextAd")
}

type ContentTextAd implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentTextAdQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
