const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentCollection(input: ContentCollectionQueryInput!): ContentCollection @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentCollection")
}

type ContentCollection implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentCollectionQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
