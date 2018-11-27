const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentArticle(input: ContentArticleQueryInput!): ContentArticle @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentArticle")
}

type ContentArticle implements Content & Authorable @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentArticleQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
