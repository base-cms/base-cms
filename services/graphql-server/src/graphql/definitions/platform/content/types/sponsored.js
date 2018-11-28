const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentSponsored(input: ContentSponsoredQueryInput!): ContentSponsored @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentSponsored")
}

type ContentSponsored implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentSponsoredQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
