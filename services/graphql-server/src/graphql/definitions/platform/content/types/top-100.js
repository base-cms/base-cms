const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentTop100(input: ContentTop100QueryInput!): ContentTop100 @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentTop100")
}

type ContentTop100 implements Content & Addressable & SocialLinkable @applyInterfaceFields {
  # fields directly on platform.model::Content\Top100
  totalCapacity: String @projection
  rank: Int @projection
  previousRank: Int @projection
  founded: String @projection
  companyType: String @projection
  phone: String @projection
  website: String @projection
  employees: String @projection
  revenueCurrent: String @projection
  revenuePrior1: String @projection
  revenuePriorYear1: String @projection
  revenuePrior2: String @projection
  revenuePriorYear2: String @projection
  companyExecutives: String @projection
  majorRevenue: String @projection
  productCategories: String @projection
  marketsServing: String @projection

}

type ContentTop100Connection {
  totalCount: Int!
  edges: [ContentTop100Edge]!
  pageInfo: PageInfo!
}

type ContentTop100Edge {
  node: ContentTop100!
  cursor: String!
}

input ContentTop100QueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentTop100SortInput {
  field: ContentSortField = rank
  order: SortOrder = asc
}

`;
