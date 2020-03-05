const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  brevityCollection(input: BrevityCollectionQueryInput!): BrevityCollection @findOne(model: "platform.Product", using: { id: "_id" }, criteria: "brevityCollection")
  brevityCollections(input: BrevityCollectionsQueryInput = {}): BrevityCollectionConnection! @findMany(model: "platform.Product", criteria: "brevityCollection")
}

enum BrevityCollectionSortField {
  id
  name
  sequence
}

type BrevityCollection {
  # fields from platform.model::Product
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  name: String! @projection
  fullName: String @projection
  description: String @projection

  # fields from platform.trait::StatusEnabled
  status: Int @projection

  # fields from platform.trait::Sequenceable
  sequence: Int @projection

  # fields directly on brevity.model::Product\Collection
  accentColor: String
  coverImage: BrevityAssetImage @projection

  issues(input: BrevityCollectionIssuesInput = {}): BrevityIssueConnection!
    @projection(localField: "_id")
    @refMany(
      model: "brevity.Issue",
      refQueryBuilder: "brevityCollectionIssues",
      localField: "_id",
      foreignField: "collection.$id"
    )
}

type BrevityCollectionConnection @projectUsing(type: "BrevityCollection") {
  totalCount: Int!
  edges: [BrevityCollectionEdge]!
  pageInfo: PageInfo!
}

type BrevityCollectionEdge {
  node: BrevityCollection!
  cursor: String!
}

input BrevityCollectionQueryInput {
  id: ObjectID!
  status: ModelStatus = active
}

input BrevityCollectionsQueryInput {
  status: ModelStatus = active
  sort: BrevityCollectionSortInput = {}
  pagination: PaginationInput = {}
}

input BrevityCollectionSortInput {
  field: BrevityCollectionSortField = id
  order: SortOrder = desc
}

input BrevityCollectionIssuesInput {
  sort: BrevityIssueSortInput = {}
  pagination: PaginationInput = {}
}

`;
