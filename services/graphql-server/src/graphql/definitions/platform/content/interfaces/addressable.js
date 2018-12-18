const gql = require('graphql-tag');

module.exports = gql`

interface Addressable {
  # fields from platform.trait::Content\Addressable
  address1: String @projection
  address2: String @projection
  city: String @projection
  state: String @projection
  zip: String @projection
  country: String @projection
  location: ContentStubLocation @projection
}

`;
