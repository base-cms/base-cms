const gql = require('graphql-tag');

module.exports = gql`

interface Content @requiresProject(fields: ["type"]) {
  # fields directly on platform.model::Content
  id: Int! @projection(localField: "_id") @value(localField: "_id")
  type(input: ContentTypeInput = {}): String! @projection
  name(input: ContentMutationInput = {}): String @projection(localField: "name", needs: ["mutations.Website.name", "mutations.Email.name", "mutations.Magazine.name"]) @mutatedValue
  shortName: String @projection(localField: "shortName", needs: ["name"]) @value(fallbackField: "name") # @todo Add support for falling back to the provided mutation input.
  fullName: String @projection # @todo should be calculated in resolvers
  hash: String @projection
  created: Date @projection
  updated: Date @projection
  touched: Date @projection
  published: Date @projection
  unpublished: Date @projection
  createdBy: User @projection @refOne(loader: "platformUser")
  updatedBy: User @projection @refOne(loader: "platformUser")

  # fields that used to be model specific, but were moved to the root
  deck: String @projection(localField: "mutations.Magazine.deck") @value(localField: "mutations.Magazine.deck")
  company(input: ContentCompanyInput = {}): ContentCompany @projection @refOne(loader: "platformContent", criteria: "contentCompany")

  # fields from platform.trait::StatusEnabled
  status: Int @projection

  # fields from platform.trait::Content\BodyFields
  # @todo Add truncate support!
  teaser(input: ContentMutationInput = {}): String @projection(localField: "teaser", needs: ["mutations.Website.teaser", "mutations.Email.teaser", "mutations.Magazine.teaser"]) @mutatedValue
  body(input: ContentMutationInput = {}): String @projection(localField: "body", needs: ["mutations.Website.body", "mutations.Email.body", "mutations.Magazine.body"]) @mutatedValue
  notes: String @projection

  # fields from platform.trait::Taggable
  taxonomy(input: ContentTaxonomyInput = {}): TaxonomyConnection! @projection @refMany(model: "platform.Taxonomy", using: { type: "type" })

  # fields from platform.trait::ContentRelateable
  relatedTo(input: ContentRelatedToInput = {}): ContentConnection! @projection @refMany(model: "platform.Content", criteria: "content")

  # fields from platform.trait::MediaRelatable
  primaryImage: AssetImage @projection @refOne(loader: "platformAsset", criteria: "assetImage")
  images(input: ContentImagesInput = {}): AssetImageConnection! @projection @refMany(model: "platform.Asset", criteria: "assetImage")

  # fields from platform.model::Content mutations
  # schedules: PlatformContentSchedules! @passThru
  primarySite(input: ContentPrimarySiteInput = {}): WebsiteSite @projection(localField: "mutations.Website.primarySite") @refOne(loader: "platformProduct", localField: "mutations.Website.primarySite", criteria: "websiteSite")
  primarySection(input: ContentPrimarySectionInput = {}): WebsiteSection @projection(localField: "mutations.Website.primarySection") @refOne(loader: "websiteSection", localField: "mutations.Website.primarySection")

  # fields from platform.trait::Content\SeoFields
  seoTitle: String @projection(localField: "mutations.Website.seoTitle", needs: ["name"]) @value(localField: "mutations.Website.seoTitle", fallbackField: "name")
  alias: String @projection(localField: "mutations.Website.alias") @value(localField: "mutations.Website.alias")
  redirects: [String]! @projection(localField: "mutations.Website.redirects") @arrayValue(localField: "mutations.Website.redirects")
  slug: String @projection(localField: "mutations.Website.slug") @value(localField: "mutations.Website.slug")

  # GraphQL-only fields.
  statusText: String! @projection(localField: "status", needs: ["published", "unpublished"])
  metadata: ContentMetadata! @projection(localField: "name", needs: ["mutations.Website.name", "mutations.Website.seoTitle", "teaser", "mutations.Website.teaser"])
  createdDate(input: FormatDate = {}): String @projection(localField: "created") @momentFormat(localField: "created")
  updatedDate(input: FormatDate = {}): String @projection(localField: "updated") @momentFormat(localField: "updated")
  publishedDate(input: FormatDate = {}): String @projection(localField: "published") @momentFormat(localField: "published")
  unpublishedDate(input: FormatDate = {}): String @projection(localField: "unpublished") @momentFormat(localField: "unpublished")
  canonicalPath: String! @projection(localField: "_id", needs: ["type", "linkUrl", "mutations.Website.slug", "mutations.Website.primarySection"])
  # Determines if this content item should redirect to another location.
  redirectTo: String @projection(localField: "type", needs: ["linkUrl"])
}

`;
