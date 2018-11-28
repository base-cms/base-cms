const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentPage(input: ContentPageQueryInput!): ContentPage @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentPage")
}

type ContentPage implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

type ContentPageConnection {
  totalCount: Int!
  edges: [ContentPageEdge]!
  pageInfo: PageInfo!
}

type ContentPageEdge {
  node: ContentPage!
  cursor: String!
}

input ContentPageQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentPageSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
