const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentWebinar(input: ContentWebinarQueryInput!): ContentWebinar @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentWebinar")
}

type ContentWebinar implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentWebinarQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
