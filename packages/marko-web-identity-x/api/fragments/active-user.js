const gql = require('graphql-tag');

module.exports = gql`

fragment ActiveUserFragment on AppUser {
  id
  email
  givenName
  familyName
  organization
  organizationTitle
  countryCode
  regionCode
  postalCode
}

`;
