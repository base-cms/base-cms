const gql = require('graphql-tag');

module.exports = gql`

query GetActiveAppContext {
  activeAppContext {
    user {
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
    mergedTeams {
      id
      name
      photoURL
    }
    mergedAccessLevels {
      id
      name
    }
    hasTeams
    hasUser
  }
}

`;
