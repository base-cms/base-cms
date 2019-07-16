const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentTopList(input: ContentTopListQueryInput!): ContentTopList @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentTopList")
}

type ContentTopList implements Content & Authorable @applyInterfaceFields

input ContentTopListQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
