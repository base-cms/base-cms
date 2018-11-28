const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentGroup(input: ContentGroupQueryInput!): ContentGroup @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentGroup")
}

type ContentGroup implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentGroupQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
