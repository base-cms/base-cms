const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  brevityIssue(input: BrevityIssueQueryInput!): BrevityIssue @findOne(
    model: "brevity.Issue"
    using: { id: "_id" }
  )
  brevityIssues(input: BrevityIssuesQueryInput = {}): BrevityIssueConnection! @findMany(
    model: "brevity.Issue"
  )
}

extend type Mutation {
  updateBrevityIssueStories(input: UpdateBrevityIssueStoriesMutationInput!): BrevityIssue! @requiresAuth
}

enum BrevityIssueSortField {
  id
  name
}

type BrevityIssue {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  collection(input: BrevityIssueCollectionInput = {}): BrevityCollection @projection @refOne(loader: "platformProduct", criteria: "brevityCollection")
  stories(input: BrevityIssueStoriesInput = {}): BrevityStoryConnection! @projection @refMany(model: "brevity.Story")

  coverImage: BrevityAssetImage @projection
  coverVideo: BrevityAssetVideo @projection

  name: String @projection
  customStyle: String @projection
  accentColor: String @projection
  deleted: Boolean! @projection
  status: String! @projection
  coverCredit: String @projection
  textLocation: String @projection
  description: String @projection
}

type BrevityIssueConnection @projectUsing(type: "BrevityIssue") {
  totalCount: Int!
  edges: [BrevityIssueEdge]!
  pageInfo: PageInfo!
}

type BrevityIssueEdge {
  node: BrevityIssue!
  cursor: String!
}

input BrevityIssueQueryInput {
  id: ObjectID!
}

input BrevityIssueCollectionInput {
  status: ModelStatus = active
}

input BrevityIssueStoriesInput {
  sort: BrevityStorySortInput = {}
  pagination: PaginationInput = {}
}

input BrevityIssuesQueryInput {
  sort: BrevityIssueSortInput = {}
  pagination: PaginationInput = {}
}

input BrevityIssueSortInput {
  field: BrevityIssueSortField = id
  order: SortOrder = desc
}

input UpdateBrevityIssueStoriesMutationInput {
  id: ObjectID!
  payload: UpdateBrevityIssueStoriesMutationPayloadInput!
}

input UpdateBrevityIssueStoriesMutationPayloadInput {
  storyIds: [ObjectID!]!
}

`;
