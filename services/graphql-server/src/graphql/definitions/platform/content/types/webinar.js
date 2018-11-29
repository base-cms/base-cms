const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentWebinar(input: ContentWebinarQueryInput!): ContentWebinar @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentWebinar")
}

type ContentWebinar implements Content & Media @applyInterfaceFields {
  # fields directly on platform.model::Content\Webinar
  startDate: Date
  duration: Int
  linkUrl: String
}

type ContentWebinarConnection {
  totalCount: Int!
  edges: [ContentWebinarEdge]!
  pageInfo: PageInfo!
}

type ContentWebinarEdge {
  node: ContentWebinar!
  cursor: String!
}

input ContentWebinarQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentWebinarSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

# @todo Implement.
input ContentWebinarQueryUpcoming {
  excludeContentTypes: [ContentType]! = []
  includeContentTypes: [ContentType]! = []
  taxonomyFilter: [Int]! = []
}

`;
