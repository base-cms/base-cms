const gql = require('graphql-tag');

module.exports = gql`

# Renamed from 'Contacts' interface in Base Platform
interface Inquirable {
  # fields from platform.model::Content mutations
  enableRmi: Boolean @projection(localField: "mutations.Website.enableRmi") @value(localField: "mutations.Website.enableRmi")
  # GraphQL-only fields
  inquiryContacts: [ContentContact!]! @projection(localField: "salesContacts", needs: ["company", "parentCompany", "venue", "parentVenue", "supplier", "parentSupplier"])

  # @deprecated: This field was deprecated in Base3 and should no longer be used.
  leadsDelivery: Boolean @projection(localField: "mutations.Website.leadsDelivery") @value(localField: "mutations.Website.leadsDelivery")
}

`;
