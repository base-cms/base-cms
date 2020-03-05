const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  icarusConfiguration(input: IcarusConfigurationQueryInput!): IcarusConfiguration @findOne(
    model: "configuration.Theme"
    using: { id: "_id" }
    criteria: "configurationThemeIcarus"
  )
  @requiresAuth
}

extend type Mutation {
  updateIcarusConfiguration(input: UpdateIcarusConfigurationMutationInput!): IcarusConfiguration @requiresAuth
}

type IcarusConfiguration @applyInterfaceFields {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  status: Int! @projection
  defaultHeader: JSON @projection
  defaultFooter: JSON @projection
  homePage: JSON @projection
  defaultPage: JSON @projection
  pages: [JSON]! @projection @arrayValue
  socialShare: [EntityStubSocial]! @projection @arrayValue
  templates: JSON @projection
  nativeAdTargetMap: JSON @projection
  loadMore: JSON @projection
  parameters: JSON @projection
}

input IcarusConfigurationQueryInput {
  id: ObjectID!
}

input UpdateIcarusConfigurationMutationInput {
  id: ObjectID!
  payload: JSON!
}

`;
