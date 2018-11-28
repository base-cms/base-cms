const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentCompany(input: ContentCompanyQueryInput!): ContentCompany @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentCompany")
}

type ContentCompany implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentCompanyQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
