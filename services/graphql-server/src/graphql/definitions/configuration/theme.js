const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  configurationTheme(input: ConfigurationThemeQueryInput!): ConfigurationTheme @findOne(
    model: "configuration.Theme",
    using: { id: "_id" },
  )
}

extend type Mutation {
  updateConfigurationTheme(input: UpdateConfigurationThemeMutationInput!): ConfigurationTheme @requiresAuth
}

enum ConfigurationThemeType {
  Lego
  Icarus
}

interface ConfigurationTheme @requiresProject(fields: ["type"]) {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  type: ConfigurationThemeType! @projection
  status: Int! @projection
}

type ConfigurationThemeLego implements ConfigurationTheme @applyInterfaceFields {
  defaultContentBrick: JSON @projection
  styles: JSON @projection
  bgColors: JSON @projection
  column: JSON @projection
  sets: JSON @projection
}

type ConfigurationThemeIcarus implements ConfigurationTheme @applyInterfaceFields {
  defaultHeader: JSON @projection
  defaultFooter: JSON @projection
  homePage: JSON @projection
  defaultPage: JSON @projection
  pages: JSON @projection
  socialShare: JSON @projection
  templates: JSON @projection
  nativeAdTargetMap: JSON @projection
  parameters: JSON @projection
  loadMore: JSON @projection
}

input ConfigurationThemeQueryInput {
  id: ObjectID!
}

input UpdateConfigurationThemeMutationInput {
  id: ObjectID!
  payload: JSON!
}

`;
