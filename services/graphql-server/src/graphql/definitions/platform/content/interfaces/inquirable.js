const gql = require('graphql-tag');

module.exports = gql`

# Renamed from 'Contacts' interface in Base Platform
interface Inquirable {
  # fields from platform.model::Content mutations
  enableRmi: Boolean @projection(localField: "mutations.Website.enableRmi") @value(localField: "mutations.Website.enableRmi")
  leadsDelivery: Boolean @projection(localField: "mutations.Website.leadsDelivery") @value(localField: "mutations.Website.leadsDelivery")
}

`;
