const gql = require('graphql-tag');

module.exports = gql`

# Renamed from 'Contacts' interface in Base Platform
interface ContentContactable {
  # fields directly on platform.interface::Contacts
  listingContacts(input: ContentListingContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
  publicContacts(input: ContentPublicContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
  salesContacts(input: ContentSalesContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
  marketingContacts(input: ContentMarketingContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
}

input ContentContactSortInput {
  field: ContentContactSortField = id
  order: SortOrder = desc
}

input ContentListingContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input ContentPublicContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input ContentSalesContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input ContentMarketingContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

`;
