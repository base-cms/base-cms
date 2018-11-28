const gql = require('graphql-tag');

module.exports = gql`

interface Contactable {
  # fields from platform.trait::Content\Contactable
  # originally the company field was also present
  # this was removed now that company has been added to all content types
  phone: String
  tollfree: String
  fax: String
  website: String
  email: String
  firstName: String
  lastName: String
  title: String
  mobile: String
  publicEmail: String
}

`;
