const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentEvent(input: ContentEventQueryInput!): ContentEvent @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentEvent")
}

type ContentEvent implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentEventQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
