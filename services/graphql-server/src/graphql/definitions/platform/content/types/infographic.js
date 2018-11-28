const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentInfographic(input: ContentInfographicQueryInput!): ContentInfographic @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentInfographic")
}

type ContentInfographic implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentInfographicQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
