const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentVenue(input: ContentVenueQueryInput!): ContentVenue @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentVenue")
}

type ContentVenue implements Content & Contactable & Addressable & SocialLinkable & Inquirable & OrganizationContactable @applyInterfaceFields {
  # fields directly on platform.model::Content\Venue
  totalCapacity: String @projection
  parentVenue(input: ContentVenueParentVenueInput = {}): ContentVenue @projection @refOne(loader: "platformContent" criteria: "contentVenue")

  # GraphQL-only fields
  spaces(input: ContentSpacesQueryInput = {}): ContentSpaceConnection! @projection(localField: "_id") @refMany(model: "platform.Content", localField: "_id", foreignField: "venue", criteria: "contentSpace")
}

input ContentVenueQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentVenueParentVenueInput {
  status: ModelStatus = active
}

input ContentSpacesQueryInput {
  status: ModelStatus = active
  sort: ContentSpaceSortInput = { order: asc }
}

`;
