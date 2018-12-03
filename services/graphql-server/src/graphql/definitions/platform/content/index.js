const gql = require('graphql-tag');
const interfaces = require('./interfaces');
const types = require('./types');

module.exports = gql`

extend type Query {
  allContent(input: AllContentQueryInput = {}): ContentConnection! @findMany(model: "platform.Content", criteria: "content")
  websiteScheduledContent(input: WebsiteScheduledContentQueryInput = {}): ContentConnection!
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
  Sponsored
  TextAd
  Video
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
  fullName
  created
  updated
  published
}

enum ContentPathField {
  id
  type
  slug
  sectionAlias
}

enum RelatedContentQueryType {
  # returns related content from doc.relatedTo
  owned
  # returns related content on the inverse of doc.relatedTo
  inverse
  # returns both to and inverse combined
  combined
  # returns related content based on primary section
  primarySection
  # returns related content based on inverse company and relatedTo
  company
}

type ContentConnection {
  totalCount: Int!
  edges: [ContentEdge]!
  pageInfo: PageInfo!
}

type ContentEdge {
  node: Content!
  cursor: String!
}

type ContentMetadata {
  title: String
  description: String
}

type ContentStubLocation {
  latitude: Float
  longitude: Float
}

type ContentStubSidebar {
  body: String
}

input AllContentQueryInput {
  status: ModelStatus = active
  sort: ContentSortInput = {}
  pagination: PaginationInput = {}
}

input WebsiteScheduledContentQueryInput {
  sectionId: Int!
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

input ContentMutationInput {
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
  sort: AssetImageSortInput = {}
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
