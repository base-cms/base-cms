const gql = require('graphql-tag');

module.exports = gql`

fragment ActiveUserFragment on AppUser {
  id
  email
  givenName
  familyName
  displayName
  organization
  organizationTitle
  countryCode
  regionCode
  postalCode
  receiveEmail
}

`;
