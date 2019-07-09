const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentCompany(input: ContentCompanyQueryInput!): ContentCompany @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentCompany")
}

type ContentCompany implements Content & Contactable & Addressable & SocialLinkable & Inquirable & OrganizationContactable @applyInterfaceFields {
  # fields directly on platform.model::Content\Company
  companyType: String @projection
  parentCompany(input: ContentCompanyParentCompanyInput = {}): ContentCompany @projection @refOne(loader: "platformContent" criteria: "contentCompany")
  brandsCarried(input: ContentCompanyBrandsCarriedInput = {}): ContentCompanyConnection! @projection @refMany(model: "platform.Content" criteria: "contentCompany")
  statesServed: [String]! @projection @arrayValue
  companyCompetitors(input: ContentCompanyCompanyCompetitorsInput = {}): ContentCompanyConnection! @projection @refMany(model: "platform.Content", criteria: "contentCompany")

  # fields directly on platform.model::Content\Company from mutations
  featuredCategories(input: ContentCompanyFeaturedCategoriesInput = {}): TaxonomyConnection! @projection(localField: "mutations.Website.featuredCategories") @refMany(model: "platform.Taxonomy", localField: "mutations.Website.featuredCategories", criteria: "taxonomyCategory")
  primaryCategory(input: ContentCompanyPrimaryCategoryInput = {}): Taxonomy @projection(localField: "mutations.Website.primaryCategory") @refOne(loader: "platformTaxonomy", localField: "mutations.Website.primaryCategory")
}

type ContentCompanyConnection {
  totalCount: Int!
  edges: [ContentCompanyEdge]!
  pageInfo: PageInfo!
}

type ContentCompanyEdge {
  node: ContentCompany!
  cursor: String!
}

input ContentCompanyQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentCompanyCompanyCompetitorsInput {
  status: ModelStatus = active
  sort: ContentCompanySortInput = {}
  pagination: PaginationInput = {}
}

input ContentCompanyBrandsCarriedInput {
  status: ModelStatus = active
  sort: ContentCompanySortInput = {}
  pagination: PaginationInput = {}
}

input ContentCompanyFeaturedCategoriesInput {
  status: ModelStatus = active
  sort: TaxonomySortInput = {}
  pagination: PaginationInput = {}
}

input ContentCompanyParentCompanyInput {
  status: ModelStatus = active
}

input ContentCompanyPrimaryCategoryInput {
  status: ModelStatus = active
}

input ContentCompanySortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
