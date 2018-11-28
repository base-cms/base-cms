const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentInQuarters(input: ContentInQuartersQueryInput!): ContentInQuarters @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentInQuarters")
}

type ContentInQuarters implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentInQuartersQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
