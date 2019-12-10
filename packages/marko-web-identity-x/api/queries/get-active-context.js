const gql = require('graphql-tag');

module.exports = gql`

query GetActiveAppContext {
  activeAppContext {
    user {
      id
      email
      givenName
      familyName
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
