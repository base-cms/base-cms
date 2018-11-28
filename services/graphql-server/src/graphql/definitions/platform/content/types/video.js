const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentVideo(input: ContentVideoQueryInput!): ContentVideo @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentVideo")
}

type ContentVideo implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentVideoQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
