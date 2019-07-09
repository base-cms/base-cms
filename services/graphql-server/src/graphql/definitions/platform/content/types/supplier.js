const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  contentSupplier(input: ContentSupplierQueryInput!): ContentSupplier @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentSupplier")
}

type ContentSupplier implements Content & Contactable & Addressable & SocialLinkable & Inquirable & CompanyContactable @applyInterfaceFields {
  # fields directly on platform.model::Content\Supplier
  parentSupplier(input: ContentSupplierParentSupplierInput = {}): ContentSupplier @projection @refOne(loader: "platformContent" criteria: "contentSupplier")
}

input ContentSupplierQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentSupplierParentSupplierInput {
  status: ModelStatus = active
}

`;
