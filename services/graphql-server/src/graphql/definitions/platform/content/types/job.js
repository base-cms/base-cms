const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentJob(input: ContentJobQueryInput!): ContentJob @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentJob")
}

type ContentJob implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentJobQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
