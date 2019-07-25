const gql = require('graphql-tag');

module.exports = gql`

extend type Mutation {
  createInquirySubmission(input: CreateInquirySubmissionInput!): InquirySubmission!
}

type InquirySubmission {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  contentId: Int!
  addresses: InquirySubmissionAddresses! @projection
  created: Date @projection
}

type InquirySubmissionAddresses {
  to: [String!] @projection
  cc: [String!] @projection
  bcc: [String!] @projection
  from: String! @projection
}

input CreateInquirySubmissionInput {
  content: InquirySubmissionContentInput!
  addresses: InquirySubmissionAddressesInput!
  payload: JSON
}

input InquirySubmissionContentInput {
  id: Int!
  name: String
  companyId: Int
  companyName: String
}

input InquirySubmissionAddressesInput {
  to: [String!]
  cc: [String!]
  bcc: [String!]
  from: String!
}

`;
