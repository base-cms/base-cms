const gql = require('graphql-tag');

module.exports = gql`

interface Content {
  # fields directly on platform.model::Content
  id: Int! @value(localField: "_id")
  type: String!
  # type(input: PlatformContentTypeInput = {}): String! @inflect
  name(input: ContentMutationInput = {}): String @mutatedValue
  shortName: String @value(fallbackField: "name") # @todo Add support for falling back to the provided mutation input.
  fullName: String # @todo should be calculated in resolvers
  hash: String
  created: Date
  updated: Date
  touched: Date
  published: Date
  unpublished: Date
  createdBy: User @refOne(model: "platform.User")
  updatedBy: User @refOne(model: "platform.User")

  # fields that used to be model specific, but were moved to the root
  deck: String @value(localField: "mutations.Magazine.deck")

  # fields from platform.trait::StatusEnabled
  status: Int

  # fields from platform.trait::Content\BodyFields
  # @todo Add truncate support!
  teaser(input: ContentMutationInput = {}): String @mutatedValue
  body(input: ContentMutationInput = {}): String @mutatedValue
  notes: String

  # fields from platform.trait::Taggable
  taxonomy(input: ContentTaxonomyInput = {}): TaxonomyConnection! @refMany(model: "platform.Taxonomy", using: { type: "type" })

  # fields from platform.trait::ContentRelateable
  relatedTo(input: ContentRelatedToInput = {}): ContentConnection! @refMany(model: "platform.Content")

  # fields from platform.trait::MediaRelatable
  primaryImage: AssetImage @refOne(model: "platform.Asset", criteria: "assetImage")
  images(input: ContentImagesInput = {}): AssetImageConnection! @refMany(model: "platform.Asset", criteria: "assetImage")

  # fields from platform.model::Content mutations
  # schedules: PlatformContentSchedules! @passThru
  primarySite(input: ContentPrimarySiteInput = {}): WebsiteSite @refOne(model: "platform.Product", localField: "mutations.Website.primarySite", criteria: "websiteSite")
  primarySection(input: ContentPrimarySectionInput = {}): WebsiteSection @refOne(model: "website.Section", localField: "mutations.Website.primarySection")

  # fields from platform.trait::Content\SeoFields
  seoTitle: String @value(localField: "mutations.Website.seoTitle", fallbackField: "name")
  alias: String @value(localField: "mutations.Website.alias")
  redirects: [String]! @arrayValue(localField: "mutations.Website.redirects")
  slug: String @value(localField: "mutations.Website.slug")

  # GraphQL-only fields.
  # metadata: PlatformContentMetadata! @contentMetadata
  createdDate(input: FormatDate = {}): String @momentFormat(localField: "created")
  updatedDate(input: FormatDate = {}): String @momentFormat(localField: "updated")
  publishedDate(input: FormatDate = {}): String @momentFormat(localField: "published")
  unpublishedDate(input: FormatDate = {}): String @momentFormat(localField: "unpublished")
  canonicalPath: String!
  # Determines if this content item should redirect to another location.
  redirectTo: String
}

`;
