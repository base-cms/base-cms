const gql = require('graphql-tag');

module.exports = gql`

type EntityOrganization {
  # fields directly on platform.model::Entity
  id: String!
  emails: [EntityStubEmail]! @arrayValue
  phoneNumbers: [EntityStubPhone]! @arrayValue
  mobileNumbers: [EntityStubPhone]! @arrayValue
  faxNumbers: [EntityStubPhone]! @arrayValue
  addresses: [EntityStubAddress]! @arrayValue
  websites: [EntityStubWebsite]! @arrayValue
  socialMediaLinks: [EntityStubSocial]! @arrayValue

  # fields from platform.trait::StatusEnabled
  status: Int

  # fields directly on platform.model::Entity\Organization
  name: String
}

type EntityVenue {
  # fields directly on platform.model::Entity
  id: String!
  emails: [EntityStubEmail]! @arrayValue
  phoneNumbers: [EntityStubPhone]! @arrayValue
  mobileNumbers: [EntityStubPhone]! @arrayValue
  faxNumbers: [EntityStubPhone]! @arrayValue
  addresses: [EntityStubAddress]! @arrayValue
  websites: [EntityStubWebsite]! @arrayValue
  socialMediaLinks: [EntityStubSocial]! @arrayValue

  # fields from platform.trait::StatusEnabled
  status: Int

  # fields directly on platform.model::Entity\Venue
  name: String
}


type EntityStubEmail {
  # fields directly on platform.model::Entity\Stub\Email
  email: String

  # fields from platform.trait::Entity\Stub\Flaggable
  primary: Boolean
  public: Boolean
  label: String
}

type EntityStubPhone {
  # fields directly on platform.model::Entity\Stub\Phone
  phone: String

  # fields from platform.trait::Entity\Stub\Flaggable
  primary: Boolean
  public: Boolean
  label: String
}

type EntityStubAddress {
  # fields directly on platform.model::Entity\Stub\Address
  address1: String
  address2: String
  city: String
  region: String
  country: String
  postalCode: String
  latitude: Float
  longitude: Float

  # fields from platform.trait::Entity\Stub\Flaggable
  primary: Boolean
  public: Boolean
  label: String
}

type EntityStubWebsite {
  # fields directly on platform.model::Entity\Stub\Website
  url: String

  # fields from platform.trait::Entity\Stub\Flaggable
  primary: Boolean
  public: Boolean
  label: String
}

type EntityStubSocial {
  # fields directly on platform.model::Entity\Stub\Social
  provider: String
  url: String
  label: String
}

`;
