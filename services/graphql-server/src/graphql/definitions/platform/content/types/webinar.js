const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentWebinar(input: ContentWebinarQueryInput!): ContentWebinar @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentWebinar")
}

type ContentWebinar implements Content & Media @applyInterfaceFields {
  # fields directly on platform.model::Content\Webinar
  startDate: Date @projection
  duration: Int @projection
  linkUrl: String @projection
  sponsors(input: ContentWebinarSponsorsInput = {}): ContentCompanyConnection! @projection @refMany(model: "platform.Content" criteria: "contentCompany")

  # GraphQL only fields
  starts(input: FormatDate = {}): String @projection(localField: "startDate") @momentFormat(localField: "startDate")
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

input ContentWebinarSponsorsInput {
  status: ModelStatus = active
  sort: ContentWebinarSortInput = {}
  pagination: PaginationInput = {}
}

# @todo Implement.
input ContentWebinarQueryUpcoming {
  excludeContentTypes: [ContentType]! = []
  includeContentTypes: [ContentType]! = []
  taxonomyFilter: [Int]! = []
}

`;
