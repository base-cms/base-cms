const gql = require('graphql-tag');

module.exports = gql`

interface Inquirable {
  # fields from platform.interface::Contacts
  enableRmi: Boolean @projection(localField: "mutations.Website.enableRmi") @value(localField: "mutations.Website.enableRmi")
  # GraphQL-only fields
  inquiryEmails: [String!]! @projection(localField: "salesContacts", needs: ["mutations.Website.enableRmi", "company", "parentCompany", "venue", "parentVenue", "supplier", "parentSupplier"])
}

`;
