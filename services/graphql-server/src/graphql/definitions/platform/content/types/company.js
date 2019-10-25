const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentCompany(input: ContentCompanyQueryInput!): ContentCompany @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentCompany")
}

type ContentCompany implements Content & PrimaryCategory & Contactable & Addressable & SocialLinkable & Inquirable & OrganizationContactable @applyInterfaceFields {
  # fields directly on platform.model::Content\Company
  companyType: String @projection
  parentCompany(input: ContentCompanyParentCompanyInput = {}): ContentCompany @projection @refOne(loader: "platformContent" criteria: "contentCompany")
  brandsCarried(input: ContentCompanyBrandsCarriedInput = {}): ContentCompanyConnection! @projection @refMany(model: "platform.Content" criteria: "contentCompany")
  statesServed: [String]! @projection @arrayValue
  companyCompetitors(input: ContentCompanyCompanyCompetitorsInput = {}): ContentCompanyConnection! @projection @refMany(model: "platform.Content", criteria: "contentCompany")

  numberOfEmployees: String @projection
  trainingInformation: String @projection
  yearsInOperation: String @projection
  salesRegion: String @projection
  servicesProvided: String @projection
  salesChannels: String @projection
  productSummary: String @projection

  youtube: YoutubeSettings @projection
  youtubeVideos(input: YoutubeVideosInput = {}): YoutubePlaylistItemsApiResponse! @projection(needs: ["youtube"])

  # fields directly on platform.model::Content\Company from mutations
  featuredCategories(input: ContentCompanyFeaturedCategoriesInput = {}): TaxonomyConnection! @projection(localField: "mutations.Website.featuredCategories") @refMany(model: "platform.Taxonomy", localField: "mutations.Website.featuredCategories", criteria: "taxonomyCategory")
}

type YoutubeSettings {
  username: String
  channelId: String
  playlistId: String
}

type YoutubePlaylistItemsApiResponse {
  pageInfo: YoutubePageInfo
  items: [YoutubePlaylistItem!]
  error: String
}

type YoutubePageInfo {
  totalResults: Int
  resultsPerPage: Int
}

type YoutubePlaylistItem {
  id: String
  snippet: YoutubePlaylistItemSnippet
}

type YoutubePlaylistItemSnippet {
  publishedAt: Date
  channelId: String
  title: String
  description: String
  thumbnails: YoutubeVideoThumbnails
  channelTitle: String
  playlistId: String
  position: Int
  resourceId: YoutubePlaylistItemResourceId
}

type YoutubePlaylistItemResourceId {
  videoId: String
}

type YoutubeVideoThumbnails {
  default: YoutubeVideoThumbnail
  medium: YoutubeVideoThumbnail
  high: YoutubeVideoThumbnail
}

type YoutubeVideoThumbnail {
  url: String
  width: Int
  height: Int
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

input ContentCompanySortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

input YoutubeVideosInput {
  limit: Int = 10
}

`;
