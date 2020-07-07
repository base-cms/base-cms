const gql = require('graphql-tag');

module.exports = gql`

type EmailCampaignTestRecipient {
  firstName: String
  lastName: String
  email: String
}

type GetCampaigns {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  deploymentDate: Date
}

input GetCampaignsQueryInput {
  id: ObjectID!
}

extend type Query {
  getCampaigns(input: GetCampaignsQueryInput!): GetCampaigns!
}

`;
