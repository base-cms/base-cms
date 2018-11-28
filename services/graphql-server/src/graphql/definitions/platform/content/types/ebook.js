const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentEbook(input: ContentEbookQueryInput!): ContentEbook @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentEbook")
}

type ContentEbook implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentEbookQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
