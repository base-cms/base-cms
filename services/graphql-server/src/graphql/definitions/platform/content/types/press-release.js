const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentPressRelease(input: ContentPressReleaseQueryInput!): ContentPressRelease @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentPressRelease")
}

type ContentPressRelease implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentPressReleaseQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
