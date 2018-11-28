const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentApparatus(input: ContentApparatusQueryInput!): ContentApparatus @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentApparatus")
}

type ContentApparatus implements Content @applyInterfaceFields {
  id: Int! @value(localField: "_id")
}

input ContentApparatusQueryInput {
  id: Int!
  status: ModelStatus = active
}

`;
