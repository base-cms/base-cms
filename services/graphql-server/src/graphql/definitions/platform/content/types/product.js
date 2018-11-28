const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentProduct(input: ContentProductQueryInput!): ContentProduct @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentProduct")
}

type ContentProduct implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentProductQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
