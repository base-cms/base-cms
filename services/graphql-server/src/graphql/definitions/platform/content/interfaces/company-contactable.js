const gql = require('graphql-tag');

module.exports = gql`

# Renamed from 'Contacts' interface in Base Platform
interface CompanyContactable {
  # fields directly on platform.model::Contacts
  listingContacts(input: ContentContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
  publicContacts(input: ContentContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
  salesContacts(input: ContentContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
  marketingContacts(input: ContentContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")
}

`;
