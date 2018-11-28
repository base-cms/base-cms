const gql = require('graphql-tag');

module.exports = gql`

interface Addressable {
  # fields from platform.trait::Content\Addressable
  address1: String
  address2: String
  city: String
  state: String
  zip: String
  country: String
  location: ContentStubLocation
}

`;
