const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentCompany(input: ContentCompanyQueryInput!): ContentCompany @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentCompany")
}

type ContentCompany implements Content & Contactable & Addressable @applyInterfaceFields {
  # fields directly on platform.model::Content\Company
  companyType: String
  parentCompany(input: ContentCompanyParentCompanyInput = {}): ContentCompany @refOne(model: "platform.Content" criteria: "contentCompany")
  brandsCarried(input: ContentCompanyBrandsCarriedInput = {}): ContentCompanyConnection! @refMany(model: "platform.Content" criteria: "contentCompany")
  statesServed: [String]! @arrayValue
  listingContacts(input: ContentCompanyListingContactsInput = {}): ContentContactConnection! @refMany(model: "platform.Content", criteria: "contentContact")
  publicContacts(input: ContentCompanyPublicContactsInput = {}): ContentContactConnection! @refMany(model: "platform.Content", criteria: "contentContact")
  salesContacts(input: ContentCompanySalesContactsInput = {}): ContentContactConnection! @refMany(model: "platform.Content", criteria: "contentContact")
  marketingContacts(input: ContentCompanyMarketingContactsInput = {}): ContentContactConnection! @refMany(model: "platform.Content", criteria: "contentContact")
  companyCompetitors(input: ContentCompanyCompanyCompetitorsInput = {}): ContentCompanyConnection! @refMany(model: "platform.Content", criteria: "contentCompany")
  socialLinks: [EntityStubSocial]! @arrayValue

  # fields directly on platform.model::Content\Company from mutations
  leadsDelivery: Boolean @value(localField: "mutations.Website.leadsDelivery")
  enableRmi: Boolean @value(localField: "mutations.Website.enableRmi")
  featuredCategories(input: ContentCompanyFeaturedCategoriesInput = {}): TaxonomyConnection! @refMany(model: "platform.Taxonomy", localField: "mutations.Website.featuredCategories", criteria: "taxonomyCategory")
  primaryCategory(input: ContentCompanyPrimaryCategoryInput = {}): Taxonomy @refOne(model: "platform.Taxonomy", localField: "mutations.Website.primaryCategory")

  # GraphQL-only fields.
  # @see Cygnus\ApplicationBundle\Icarus\BlockHandler::PlatformContentCompanyContentQuery
  companyRelatedTo(input: ContentCompanyRelatedToInput = {}): ContentConnection! @relatedContent(type: company)
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

input ContentCompanyListingContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input ContentCompanyPublicContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input ContentCompanySalesContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input ContentCompanyMarketingContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
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

# From Icarus\Definitions\BlockDefinitions::getContentRelatedDefinition()
input ContentCompanyRelatedToInput {
  excludeContentTypes: [ContentType!] = []
  includeContentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  sort: ContentSortInput = {}
  pagination: PaginationInput = { first: 5 }
}

`;
