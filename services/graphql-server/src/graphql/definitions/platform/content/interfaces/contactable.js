const gql = require('graphql-tag');

module.exports = gql`

interface Contactable {
  # fields from platform.trait::Content\Contactable
  # originally the company field was also present
  # this was removed now that company has been added to all content types
  phone: String @projection
  tollfree: String @projection
  fax: String @projection
  website: String @projection
  email: String @projection
  firstName: String @projection
  lastName: String @projection
  title: String @projection
  mobile: String @projection
  publicEmail: String @projection
}

`;
