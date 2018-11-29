const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentEvent(input: ContentEventQueryInput!): ContentEvent @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentEvent")
}

type ContentEvent implements Content & Contactable & Addressable @applyInterfaceFields {
  # fields directly on platform.model::Content\Event
  cost: String
  eventType: String
  venue(input: ContentEventVenueInput = {}): EntityVenue @refOne(model: "platform.Entity", criteria: "entityVenue")
  organization(input: ContentEventOrganizationInput = {}): EntityOrganization @refOne(model: "platform.Entity", criteria: "entityOrganization")
  startDate: Date
  endDate: Date
  allDay: Boolean
  contacts: [ContentEventContact]! @arrayValue
  beneficiary: String
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
  contact(input: ContentEventContactsContactInput = {}): ContentContact @refOne(model: "platform.Content", criteria: "contentContact")
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
