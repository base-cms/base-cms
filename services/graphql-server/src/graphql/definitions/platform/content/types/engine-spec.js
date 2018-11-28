const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentEngineSpec(input: ContentEngineSpecQueryInput!): ContentEngineSpec @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentEngineSpec")
}

type ContentEngineSpec implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentEngineSpecQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
