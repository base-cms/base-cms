const gql = require('graphql-tag');
const interfaces = require('./interfaces');
const types = require('./types');

module.exports = gql`

extend type Query {
  content(input: ContentQueryInput = {}): Content @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "content")
  contentHash(input: ContentHashQueryInput = {}): Content @findOne(model: "platform.Content", using: { hash: "hash" }, criteria: "content")
  allContent(input: AllContentQueryInput = {}): ContentConnection! @findMany(model: "platform.Content", criteria: "content")
  allPublishedContent(input: AllPublishedContentQueryInput = {}): ContentConnection!
  allAuthorContent(input: AllAuthorContentQueryInput = {}): ContentConnection!
  allCompanyContent(input: AllCompanyContentQueryInput = {}): ContentConnection!
  magazineScheduledContent(input: MagazineScheduledContentQueryInput = {}): ContentConnection!
  websiteScheduledContent(input: WebsiteScheduledContentQueryInput = {}): ContentConnection!
  relatedPublishedContent(input: RelatedPublishedContentQueryInput = {}): ContentConnection!
}

enum GateableUserRole {
  ROLE_REGISTERED
}

enum GateableSurveyProvider {
  wufoo
  idme
  app_form_com
  idx
}

enum ContentMutation {
  Email
  Magazine
  Website
}

enum ContentType {
  Apparatus
  Article
  Blog
  Collection
  Company
  Contact
  Document
  Ebook
  EngineSpec
  Event
  Group
  InQuarters
  Infographic
  Job
  MediaGallery
  News
  Page
  Podcast
  PressRelease
  Product
  Promotion
  Review
  Space
  Sponsored
  Supplier
  TextAd
  TopList
  Video
  Venue
  Webinar
  Whitepaper
}

enum ContentTypeFormat {
  standard
  dasherize
  underscore
  titleize
}

# NOTE: these fields must be properly indexed (with the correct collation)
# otherwise sorted queries will be **slow** (5ms vs 500ms slow).
# Generally speaking the index for each field would be:
# createIndex({ [field]: 1, _id: 1 }, { collation: { locale: 'en_US } })
enum ContentSortField {
  id
  name
  created
  updated
  published
  startDate
  endDate
}

enum ContentPathField {
  id
  type
  slug
  sectionAlias
}

enum ContentAuthorType {
  author
  contributor
  photographer
}

enum RelatedContentQueryType {
  # returns related content from doc.relatedTo
  owned
  # returns related content on the inverse of doc.relatedTo
  inverse
  # returns related content based on primary section
  primarySection
  # returns related content based on inverse company and relatedTo
  company
}

type ContentGating {
  requiredRole: GateableUserRole
  surveyType: GateableSurveyProvider
  surveyId: String
}

type ContentUserRegistration {
  isRequired: Boolean!
  accessLevels: [String]!
}

type ContentConnection @projectUsing(type: "Content") {
  totalCount: Int!
  edges: [ContentEdge]!
  pageInfo: PageInfo!
}

type ContentEdge {
  node: Content!
  cursor: String!
}

# Note: any required projections must be set at the root "metadata" field
type ContentMetadata {
  title: String
  description: String
  publishedDate(input: FormatDate = {}): String @momentFormat(localField: "published")
  updatedDate(input: FormatDate = {}): String @momentFormat(localField: "updated")
  expiresDate(input: FormatDate = {}): String @momentFormat(localField: "unpublished")
  image: AssetImage @refOne(localField: "primaryImage", loader: "platformAsset", criteria: "assetImage")
}

type ContentStubLocation {
  latitude: Float
  longitude: Float
}

input ContentQueryInput {
  status: ModelStatus = active
  id: Int!
}

input ContentHashQueryInput {
  status: ModelStatus = active
  hash: String!
}

input AllPublishedContentQueryInput {
  since: Date
  sectionId: Int
  contentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  sectionBubbling: Boolean = true
  sort: ContentSortInput = { field: published, order: desc }
  pagination: PaginationInput = {}
  beginning: ContentBeginningInput = {}
  ending: ContentEndingInput = {}
}

input AllAuthorContentQueryInput {
  contactId: Int!
  since: Date
  authorTypes: [ContentAuthorType!] = [author, contributor, photographer]
  includeContentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  sort: ContentSortInput = { field: published, order: desc }
  pagination: PaginationInput = {}
}

input AllCompanyContentQueryInput {
  companyId: Int!
  since: Date
  includeContentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  sort: ContentSortInput = { field: published, order: desc }
  pagination: PaginationInput = {}
}

input ContentBeginningInput {
  before: Date
  after: Date
}

input ContentEndingInput {
  before: Date
  after: Date
}

input AllContentQueryInput {
  status: ModelStatus = active
  sort: ContentSortInput = {}
  pagination: PaginationInput = {}
}

input MagazineScheduledContentQueryInput {
  issueId: Int!
  sectionId: Int
  excludeContentIds: [Int!] = []
  excludeSectionIds: [Int!] = []
  excludeContentTypes: [ContentType!] = []
  includeContentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  pagination: PaginationInput = {}
}

input WebsiteScheduledContentQueryInput {
  sectionId: Int
  sectionAlias: String
  optionId: Int
  excludeContentIds: [Int!] = []
  excludeSectionIds: [Int!] = []
  excludeContentTypes: [ContentType!] = []
  includeContentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  useOptionFallback: Boolean = false
  sectionBubbling: Boolean = true
  pagination: PaginationInput = {}
}

input RelatedPublishedContentQueryInput {
  contentId: Int!
  excludeContentTypes: [ContentType!] = []
  includeContentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  queryTypes: [RelatedContentQueryType!] = [owned, inverse]
  pagination: PaginationInput = {}
}

input ContentRelatedContentInput {
  excludeContentTypes: [ContentType!] = []
  includeContentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  queryTypes: [RelatedContentQueryType!] = [owned, inverse]
  pagination: PaginationInput = {}
}

input ContentMutationInput {
  mutation: ContentMutation = Website
}

input ContentTeaserInput {
  mutation: ContentMutation = Website
  useFallback: Boolean = true
  minLength: Int = 75
  maxLength: Int = 125
  truncatedSuffix: String = "..."
}

input ContentBodyInput {
  mutation: ContentMutation = Website
}

input ContentTaxonomyInput {
  status: ModelStatus = active
  type: TaxonomyType
  sort: TaxonomySortInput = {}
  pagination: PaginationInput = {}
}

input ContentRelatedToInput {
  status: ModelStatus = active
  sort: ContentSortInput = {}
  pagination: PaginationInput = {}
}

input ContentCompanyInput {
  status: ModelStatus = active
}

input ContentImagesInput {
  sort: AssetImageSortInput = { order: values }
  pagination: PaginationInput = {}
}

input ContentPrimarySiteInput {
  status: ModelStatus = active
}

input ContentPrimarySectionInput {
  status: ModelStatus = active
}

input ContentTypeInput {
  format: ContentTypeFormat = dasherize
}

input ContentSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

${interfaces}
${types}

`;
