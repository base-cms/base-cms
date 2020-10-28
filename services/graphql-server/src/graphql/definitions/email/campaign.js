const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  emailCampaign(input: EmailCampaignQueryInput!): EmailCampaign @findOne(
    model: "email.Campaign",
    using: { id: "_id" }
  )
  emailCampaigns(input: EmailCampaignQueryInput!): EmailCampaignConnection
}

type EmailCampaignConnection @projectUsing(type: "EmailCampaign") {
  totalCount: Int!
  edges: [EmailCampaignEdge]!
  pageInfo: PageInfo!
}

type EmailCampaignEdge {
  node: EmailCampaign!
  cursor: String!
}

type EmailCampaign {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  status: Int @projection
  name: String @projection
  created: Date @projection
  touched: Date @projection
  updated: Date @projection
  createdBy: Date @projection
  deploymentDate: Date @projection
  scheduled: Date @projection
  htmlDate: Date @projection
  externalId: String @projection
  fromName: String @projection
  html: String @projection
  listId: Int @projection
  listStatus: String @projection
  locked: String @projection
  subjectLine: String @projection
  listMessage: String @projection
  tests: [EmailCampaignTestRecipient] @projection
}

type EmailCampaignTestRecipient {
  firstName: String
  lastName: String
  email: String
}

enum EmailCampaignsSortField {
  status
  deploymentDate
  scheduled
}

input EmailCampaignQueryInput {
  status: ModelStatus = active
  id: ObjectID
  productId: ObjectID
  sort: EmailCampaignsSortInput = {}
  pagination: PaginationInput = {}
  beginning: CampaignBeginningInput = {}
  ending: CampaignEndingInput = {}
}

input CampaignBeginningInput {
  before: Date
  after: Date
}

input CampaignEndingInput {
  before: Date
  after: Date
}

input EmailCampaignsSortInput {
  field: EmailCampaignsSortField = deploymentDate
  order: SortOrder = desc
}
`;
