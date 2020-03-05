const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  brevityStory(input: BrevityStoryQueryInput!): BrevityStory @findOne(
    model: "brevity.Story"
    using: { id: "_id" }
  )
  brevityStoryies(input: BrevityStoriesQueryInput = {}): BrevityStoryConnection! @findMany(
    model: "brevity.Story"
  )
}

enum BrevityStorySortField {
  id
  name
}

type BrevityStory {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")

  category: String @projection
  name: String @projection
  accentColor: String @projection
  coverCredit: String @projection
  textLocation: String @projection
  byline: String @projection
  body: String @projection
  teaser: String @projection

  author: BrevityAuthor @projection
  coverImage: BrevityAssetImage @projection
  coverVideo: BrevityAssetVideo @projection

  issue(input: BrevityStoryIssueInput = {}): BrevityIssue @projection @refOne(loader: "brevity.Issue")
}

type BrevityStoryConnection @projectUsing(type: "BrevityStory") {
  totalCount: Int!
  edges: [BrevityStoryEdge]!
  pageInfo: PageInfo!
}

type BrevityStoryEdge {
  node: BrevityStory!
  cursor: String!
}

input BrevityStoryQueryInput {
  id: ObjectID!
  status: ModelStatus = active
}

input BrevityStoryIssueInput {
  status: ModelStatus = active
}

input BrevityStoriesQueryInput {
  status: ModelStatus = active
  sort: BrevityStorySortInput = {}
  pagination: PaginationInput = {}
}
input BrevityStorySortInput {
  field: BrevityStorySortField = id
  order: SortOrder = desc
}

`;
