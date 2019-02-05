const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  taxonomy(input: TaxonomyQueryInput!): Taxonomy @findOne(model: "platform.Taxonomy", using: { id: "_id" })
  taxonomies(input: TaxonomiesQueryInput = {}): TaxonomyConnection! @findMany(model: "platform.Taxonomy")
  taxonomiesOfType(input: TaxonomiesOfTypeQueryInput!): TaxonomyConnection! @findMany(model: "platform.Taxonomy", using: { type: "type" })
  rootTaxonomies(input: RootTaxonomiesQueryInput = {}): TaxonomyConnection! @findMany(model: "platform.Taxonomy", criteria: "rootTaxonomy")
  rootTaxonomiesOfType(input: RootTaxonomiesOfTypeQueryInput!): TaxonomyConnection! @findMany(model: "platform.Taxonomy", using: { type: "type" }, criteria: "rootTaxonomy")
  matchTaxonomies(input: MatchTaxonomiesQueryInput!): TaxonomyConnection! @matchMany(model: "platform.Taxonomy")
}

type Taxonomy {
  id: Int! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection
  fullName: String @projection
  description: String @projection
  type: String @projection
  status: Int @projection
  redirects: [String]! @projection @arrayValue
  sequence: Int @projection
  parent(input: TaxonomyParentInput = {}): Taxonomy @projection @refOne(loader: "platformTaxonomy")
  children(input: TaxonomyChildrenInput = {}): TaxonomyConnection! @projection(localField: "_id") @refMany(model: "platform.Taxonomy", localField: "_id", foreignField: "parent.$id")
}

type TaxonomyConnection @projectUsing(type: "Taxonomy") {
  totalCount: Int!
  edges: [TaxonomyEdge]!
  pageInfo: PageInfo!
}

type TaxonomyEdge {
  node: Taxonomy!
  cursor: String!
}

enum TaxonomyType {
  Bin
  Category
  Location
  Organization
  Person
  PlatformChannel
  Tag
  Topic
  Type
}

enum TaxonomySortField {
  id
  name
  fullName
  sequence
}

enum TaxonomyMatchField {
  name
  fullName
}

input TaxonomyQueryInput {
  status: ModelStatus = active
  id: Int!
}

input TaxonomiesQueryInput {
  status: ModelStatus = active
  sort: TaxonomySortInput = {}
  pagination: PaginationInput = {}
}

input MatchTaxonomiesQueryInput {
  status: ModelStatus = active
  pagination: PaginationInput = {}
  sort: TaxonomySortInput = { order: asc }
  field: TaxonomyMatchField!
  phrase: String!
  position: MatchPosition = contains
  match: MatchWords = all
  excludeIds: [Int!] = []
}

input TaxonomiesOfTypeQueryInput {
  type: TaxonomyType!
  status: ModelStatus = active
  sort: TaxonomySortInput = {}
  pagination: PaginationInput = {}
}

input RootTaxonomiesQueryInput {
  status: ModelStatus = active
  sort: TaxonomySortInput = {}
  pagination: PaginationInput = {}
}

input RootTaxonomiesOfTypeQueryInput {
  type: TaxonomyType!
  status: ModelStatus = active
  sort: TaxonomySortInput = {}
  pagination: PaginationInput = {}
}

input TaxonomySortInput {
  field: TaxonomySortField = id
  order: SortOrder = desc
}

input TaxonomyParentInput {
  status: ModelStatus = active
}

input TaxonomyChildrenInput {
  status: ModelStatus = active
  sort: TaxonomySortInput = {}
  pagination: PaginationInput = {}
}

`;
