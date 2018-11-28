const gql = require('graphql-tag');
const interfaces = require('./interfaces');
const types = require('./types');

module.exports = gql`

extend type Query {
  allContent(input: AllContentQueryInput = {}): ContentConnection! @findMany(model: "platform.Content", criteria: "content")
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
  ProductExternal
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

input AllContentQueryInput {
  status: ModelStatus = active
  sort: ContentSortInput = {}
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
