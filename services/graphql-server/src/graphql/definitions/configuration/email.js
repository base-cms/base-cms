const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  "Loads a single alpha email config by ID."
  emailThemeAlphaConfig(input: EmailThemeAlphaConfigQueryInput!): EmailThemeAlphaConfig @findOne(
    model: "configuration.Email"
    using: { id: "_id" }
    criteria: "emailThemeAlphaConfig"
  )

  "Loads all alpha theme email configs."
  emailThemeAlphaConfigs(input: EmailThemeAlphaConfigsQueryInput = {}): EmailThemeAlphaConfigConnection! @findMany(
    model: "configuration.Email"
    criteria: "emailThemeAlphaConfig"
  )
}

enum EmailThemeAlphaConfigSortField {
  id
}

type EmailThemeAlphaConfig {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  type: String @projection
  status: Int @projection
  accentFontColor: String @projection
  # add additional config fields here...

  headerLink: String @projection
  socialIcons: String @projection
  facebook: String @projection
  linkedin: String @projection
  twitter: String @projection
  youtube: String @projection
  instagram: String @projection
  pinterest: String @projection
  headerBgColor: String @projection
  headerTextColor: String @projection
  headerTemplate: String @projection
  dateToggle: String @projection
  footerColor: String @projection
  footerTextColor: String @projection

  headerLeft: AssetImage @projection @refOne(
    loader: "platformAsset"
    criteria: "assetImage"
  )
  headerRight: AssetImage @projection @refOne(
    loader: "platformAsset"
    criteria: "assetImage"
  )
  newsletter(input: EmailThemeAlphaConfigNewsletterInput = {}): EmailNewsletter @projection @refOne(
    loader: "platformProduct"
    criteria: "emailNewsletter"
  )
}

type EmailThemeAlphaConfigConnection @projectUsing(type: "EmailThemeAlphaConfig") {
  totalCount: Int!
  edges: [EmailThemeAlphaConfigEdge]!
  pageInfo: PageInfo!
}

type EmailThemeAlphaConfigEdge {
  node: EmailThemeAlphaConfig!
  cursor: String!
}

input EmailThemeAlphaConfigNewsletterInput {
  status: ModelStatus = active
}

input EmailThemeAlphaConfigQueryInput {
  id: ObjectID!
}

input EmailThemeAlphaConfigsQueryInput {
  status: ModelStatus = active
  sort: EmailThemeAlphaConfigSortInput = {}
}

input EmailThemeAlphaConfigSortInput {
  field: EmailThemeAlphaConfigSortField = id
  order: SortOrder = desc
}

`;
