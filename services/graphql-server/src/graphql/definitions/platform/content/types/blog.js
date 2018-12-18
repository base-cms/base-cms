const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentBlog(input: ContentBlogQueryInput!): ContentBlog @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentBlog")
}

type ContentBlog implements Content & Authorable @applyInterfaceFields {
  id: Int! @projection @value(localField: "_id")
}

type ContentBlogConnection {
  totalCount: Int!
  edges: [ContentBlogEdge]!
  pageInfo: PageInfo!
}

type ContentBlogEdge {
  node: ContentBlog!
  cursor: String!
}

input ContentBlogQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentBlogSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
