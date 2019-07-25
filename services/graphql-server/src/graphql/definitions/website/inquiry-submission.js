const gql = require('graphql-tag');

module.exports = gql`

extend type Mutation {
  createInquirySubmission(input: CreateInquirySubmissionMutationInput!): InquirySubmission!
}

type InquirySubmission {
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  contentId: Int! @projection
  payload: JSON @projection
  addresses: InquirySubmissionAddresses! @projection
  created: Date @projection
}

type InquirySubmissionAddresses {
  to: [String!] @projection
  cc: [String!] @projection
  bcc: [String!] @projection
  from: String! @projection
}

input CreateInquirySubmissionMutationInput {
  contentId: Int!
  addresses: InquirySubmissionAddressesInput!
  payload: JSON!
}

input InquirySubmissionAddressesInput {
  to: [String!]
  cc: [String!]
  bcc: [String!]
  from: String!
}

`;
