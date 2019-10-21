const gql = require('graphql-tag');
const interfaces = require('./interfaces');
const types = require('./types');

module.exports = gql`

extend type Query {
  content(input: ContentQueryInput = {}): Content @findOne(
    model: "platform.Content",
    using: { id: "_id" },
    criteria: "content",
    withSite: false, # allow content to always load, regardless of site context.
  )
  contentHash(input: ContentHashQueryInput = {}): Content @findOne(
    model: "platform.Content",
    using: { hash: "hash" },
    criteria: "content",
    withSite: false, # allow content to always load, regardless of site context.
  )
  allContent(input: AllContentQueryInput = {}): ContentConnection! @findMany(
    model: "platform.Content",
    criteria: "content",
    withSite: false, # allow content to always load, regardless of site context.
  )
  allPublishedContent(input: AllPublishedContentQueryInput = {}): ContentConnection!
  publishedContentCounts(input: PublishedContentCountsQueryInput = {}): [PublishedContentCount!]!
  contentSitemapUrls(input: ContentSitemapUrlsQueryInput = {}): [ContentSitemapUrl!]!
  contentSitemapNewsUrls(input: ContentSitemapNewsUrlsQueryInput = {}): [ContentSitemapNewsUrl!]!
  allAuthorContent(input: AllAuthorContentQueryInput = {}): ContentConnection!
  allCompanyContent(input: AllCompanyContentQueryInput = {}): ContentConnection!
  magazineScheduledContent(input: MagazineScheduledContentQueryInput = {}): ContentConnection!
  websiteScheduledContent(input: WebsiteScheduledContentQueryInput = {}): WebsiteScheduledContentConnection!
  newsletterScheduledContent(input: NewsletterScheduledContentQueryInput = {}): [Content!]!
  relatedPublishedContent(input: RelatedPublishedContentQueryInput = {}): ContentConnection!
  websiteExpiringContent(input: WebsiteExpiringContentQueryInput = {}): ContentConnection!
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

type WebsiteScheduledContentConnection @projectUsing(type: "Content") {
  totalCount: Int!
  edges: [ContentEdge]!
  section: WebsiteSection! @refOne(localField: "sectionId", loader: "websiteSection")
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

type ContentSiteContext {
  url: String!
  canonicalUrl: String!
  path: String!
}

type ContentStubLocation {
  latitude: Float
  longitude: Float
}

type ContentWebsiteSchedule {
  section: WebsiteSection @refOne(loader: "websiteSection", localField: "sectionId")
  option: WebsiteOption @refOne(loader: "websiteOption", localField: "optionId")
  start: Date
  startDate(input: FormatDate = {}): String @momentFormat(localField: "start")
  end: Date
  endDate(input: FormatDate = {}): String @momentFormat(localField: "end")
}

type PublishedContentCount {
  id: String! @value(localField: "_id")
  type(input: ContentTypeInput = {}): String!
  count: Int!
}

type ContentSitemapUrl {
  id: String! @value(localField: "_id")
  loc: String!
  lastmod: Date @value(localField: "updated")
  changefreq: SitemapChangeFreq!
  priority: Float!
  images: [ContentSitemapImage!]!
}

type ContentSitemapNewsUrl {
  id: String! @value(localField: "_id")
  loc: String!
  title: String!
  publication: ContentSitemapNewsPublication!
  published: Date
  images: [ContentSitemapImage!]!
}

type ContentSitemapNewsPublication {
  id: ObjectID! @value(localField: "_id")
  name: String!
  language: String!
}

type ContentSitemapImage {
  id: String @value(localField: "_id")
  loc: String!
  caption: String
  title: String
}

input ContentQueryInput {
  siteId: ObjectID
  status: ModelStatus = active
  id: Int!
}

input ContentHashQueryInput {
  siteId: ObjectID
  status: ModelStatus = active
  hash: String!
}

input ContentSitemapUrlsQueryInput {
  siteId: ObjectID
  since: Date
  contentTypes: [ContentType!]!
  changefreq: SitemapChangeFreq = weekly
  priority: Float = 0.5
  pagination: PaginationInput = { limit: 100 }
}

input ContentSitemapNewsUrlsQueryInput {
  siteId: ObjectID
}

input AllPublishedContentQueryInput {
  siteId: ObjectID
  since: Date
  sectionId: Int
  # @deprecated. Use \`AllPublishedContentQueryInput.includeContentTypes\` instead.
  contentTypes: [ContentType!] = []
  includeContentTypes: [ContentType!] = []
  excludeContentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  sectionBubbling: Boolean = true
  sort: ContentSortInput = { field: published, order: desc }
  pagination: PaginationInput = {}
  beginning: ContentBeginningInput = {}
  ending: ContentEndingInput = {}
}

input PublishedContentCountsQueryInput {
  siteId: ObjectID
  since: Date
  excludeContentTypes: [ContentType!] = []
  includeContentTypes: [ContentType!] = []
}

input AllAuthorContentQueryInput {
  siteId: ObjectID
  contactId: Int!
  since: Date
  authorTypes: [ContentAuthorType!] = [author, contributor, photographer]
  includeContentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  sort: ContentSortInput = { field: published, order: desc }
  pagination: PaginationInput = {}
}

input AllCompanyContentQueryInput {
  siteId: ObjectID
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
  siteId: ObjectID
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

input WebsiteExpiringContentQueryInput {
  siteId: ObjectID
  before: Date
  after: Date
  sectionId: Int
  optionId: Int
  excludeContentIds: [Int!] = []
  excludeSectionIds: [Int!] = []
  excludeContentTypes: [ContentType!] = []
  includeContentTypes: [ContentType!] = []
  pagination: PaginationInput = {}
}

input NewsletterScheduledContentQueryInput {
  newsletterId: ObjectID!
  sectionId: Int
  sectionName: String
  date: Date!
  timezone: String
  ignoreStartDate: Boolean = false
  excludeContentTypes: [ContentType!] = []
  includeContentTypes: [ContentType!] = []
  limit: Int
  skip: Int
}

input WebsiteScheduledContentQueryInput {
  siteId: ObjectID
  sectionId: Int
  sectionAlias: String
  optionId: Int
  optionName: String
  excludeContentIds: [Int!] = []
  excludeSectionIds: [Int!] = []
  excludeContentTypes: [ContentType!] = []
  includeContentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  useOptionFallback: Boolean = false
  sectionBubbling: Boolean = true
  pagination: PaginationInput = {}
  sort: ContentSortInput = { field: null }
}

input RelatedPublishedContentQueryInput {
  siteId: ObjectID
  contentId: Int!
  excludeContentTypes: [ContentType!] = []
  includeContentTypes: [ContentType!] = []
  requiresImage: Boolean = false
  queryTypes: [RelatedContentQueryType!] = [owned, inverse]
  pagination: PaginationInput = {}
}

input ContentRelatedContentInput {
  siteId: ObjectID
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
  siteId: ObjectID
  status: ModelStatus = active
}

input ContentTypeInput {
  format: ContentTypeFormat = dasherize
}

input ContentSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

input ContentHasWebsiteScheduleInput {
  siteId: ObjectID
  sectionId: Int
  sectionAlias: String
  optionId: Int
  optionName: String
  sectionBubbling: Boolean = true
}

${interfaces}
${types}

`;
