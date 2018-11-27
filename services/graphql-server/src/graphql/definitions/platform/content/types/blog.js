const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentBlog(input: ContentBlogQueryInput!): ContentBlog @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentBlog")
}

type ContentBlog implements Content & Authorable @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentBlogQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
