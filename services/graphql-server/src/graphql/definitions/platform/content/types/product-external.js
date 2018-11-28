const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentProductExternal(input: ContentProductExternalQueryInput!): ContentProductExternal @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentProductExternal")
}

type ContentProductExternal implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentProductExternalQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
