const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentEvent(input: ContentEventQueryInput!): ContentEvent @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentEvent")
}

type ContentEvent implements Content & Contactable & Addressable @applyInterfaceFields {
  # fields directly on platform.model::Content\Event
  cost: String @projection
  eventType: String @projection
  venue(input: ContentEventVenueInput = {}): EntityVenue @projection @refOne(loader: "platformEntity", criteria: "entityVenue")
  organization(input: ContentEventOrganizationInput = {}): EntityOrganization @projection @refOne(loader: "platformEntity", criteria: "entityOrganization")
  startDate: Date @projection
  endDate: Date @projection
  allDay: Boolean @projection
  contacts: [ContentEventContact]! @projection @arrayValue
  beneficiary: String @projection
}

type ContentEventConnection {
  totalCount: Int!
  edges: [ContentEventEdge]!
  pageInfo: PageInfo!
}

type ContentEventEdge {
  node: ContentEvent!
  cursor: String!
}

type ContentEventContact {
  type: String
  contact(input: ContentEventContactsContactInput = {}): ContentContact @refOne(loader: "platformContent", criteria: "contentContact")
}

input ContentEventQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentEventVenueInput {
  status: ModelStatus = active
}

input ContentEventOrganizationInput {
  status: ModelStatus = active
}

input ContentEventContactsContactInput {
  status: ModelStatus = active
}

input ContentEventSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
