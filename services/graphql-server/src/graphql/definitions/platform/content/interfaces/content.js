const gql = require('graphql-tag');

module.exports = gql`

interface Content {
  # fields directly on platform.model::Content
  id: Int! @value(localField: "_id")
  type: String!
  name: String
  # type(input: PlatformContentTypeInput = {}): String! @inflect
  # name(input: PlatformContentMutationInput = {}): String @mutatedValue
  # shortName: String @value(fallbackField: "name") # @todo Add support for falling back to the provided mutation input.
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
}

`;
