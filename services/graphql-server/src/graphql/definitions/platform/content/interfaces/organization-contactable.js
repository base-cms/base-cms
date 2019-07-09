const gql = require('graphql-tag');

module.exports = gql`

# Renamed from 'Contacts' interface in Base Platform
interface OrganizationContactable {
  # fields directly on platform.interface::Contacts
  listingContacts(input: OrganizationListingContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
  publicContacts(input: OrganizationPublicContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
  salesContacts(input: OrganizationSalesContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
  marketingContacts(input: OrganizationMarketingContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
}

input OrganizationListingContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input OrganizationPublicContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input OrganizationSalesContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input OrganizationMarketingContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

`;
