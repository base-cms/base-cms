const gql = require('graphql-tag');

module.exports = gql`

type EmailCampaignTestRecipient {
  firstName: String
  lastName: String
  email: String
}

type GetCampaigns {
  # fields from platform.model::Email (app/config/platform/models/modelspaces/email/campaign.yml)
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  deploymentDate: Date!
  scheduled: Date
}

enum EmailCampaignsSortField {
  deploymentDate
  name
  scheduled
}

input GetCampaignsQueryInput {
  id: ObjectID!
  status: ModelStatus = active
  sort: EmailCampaignsSortInput = {}
  pagination: PaginationInput = {}
}

input EmailCampaignsSortInput {
  field: EmailCampaignsSortField = deploymentDate
  order: SortOrder = desc
}

extend type Query {
  getCampaigns(input: GetCampaignsQueryInput = {}): [GetCampaigns]!
}

`;
