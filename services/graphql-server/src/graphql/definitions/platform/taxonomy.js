const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  taxonomy(input: TaxonomyQueryInput!): Taxonomy
    @findOne(model: "platform.Taxonomy", using: { id: "_id" }, criteria: "taxonomy")

  taxonomies(input: TaxonomiesQueryInput = {}): TaxonomyConnection!
    @findMany(
      model: "platform.Taxonomy",
      criteria: "taxonomy"
      queryBuilder: "taxonomies",
    )

  taxonomiesOfType(input: TaxonomiesOfTypeQueryInput!): TaxonomyConnection!
    @deprecated(reason: "Use \`Query.taxonomies\` with \`input.includeTypes = []\` instead.")
    @findMany(
      model: "platform.Taxonomy",
      using: { type: "type" },
    )

  rootTaxonomies(input: RootTaxonomiesQueryInput = {}): TaxonomyConnection!
    @deprecated(reason: "Use \`Query.taxonomies\` with \`input.rootOnly = true\` instead.")
    @findMany(
      model: "platform.Taxonomy",
      criteria: "rootTaxonomies",
    )

  rootTaxonomiesOfType(input: RootTaxonomiesOfTypeQueryInput!): TaxonomyConnection!
    @findMany(model: "platform.Taxonomy", using: { type: "type" }, criteria: "rootTaxonomiesOfType")

  matchTaxonomies(input: MatchTaxonomiesQueryInput!): TaxonomyConnection!
    @matchMany(model: "platform.Taxonomy", criteria: "taxonomy")
}

type Taxonomy {
  id: Int! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection
  fullName(input: TaxonomyFullNameInput = {}): String @projection
  description: String @projection
  type: String @projection
  status: Int @projection
  redirects: [String]! @projection @arrayValue
  sequence: Int @projection
  parent(input: TaxonomyParentInput = {}): Taxonomy @projection @refOne(loader: "platformTaxonomy")
  children(input: TaxonomyChildrenInput = {}): TaxonomyConnection! @projection(localField: "_id") @refMany(model: "platform.Taxonomy", localField: "_id", foreignField: "parent.$id")
  urlName: String
    @projection(localField: "mutations.Website.urlName")
    @value(localField: "mutations.Website.urlName")
  urlPath: String
    @projection(localField: "mutations.Website.urlPath")
    @value(localField: "mutations.Website.urlPath")

  # GraphQL-only fields.
  # Retrieves the flattened (parent) hierarchy for this taxonomy.
  hierarchy: [Taxonomy!]! @projection(localField: "parent")
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
  Award
  Badge
  Bin
  Category
  Industry
  Location
  Market
  Organization
  Person
  PlatformChannel
  Region
  System
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

input TaxonomyFullNameInput {
  suppressType: Boolean = false
  suppressId: Boolean = false
}

input TaxonomyQueryInput {
  status: ModelStatus = active
  id: Int!
}

input TaxonomiesQueryInput {
  includeIds: [Int!] = []
  excludeIds: [Int!] = []
  includeTypes: [TaxonomyType!] = []
  excludeTypes: [TaxonomyType!] = []
  rootOnly: Boolean = false
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
