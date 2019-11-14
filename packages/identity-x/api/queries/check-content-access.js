const gql = require('graphql-tag');

module.exports = gql`

query CheckContentAccess($input: CheckContentAccessQueryInput!) {
  checkContentAccess(input: $input) {
    canAccess
    isLoggedIn
    hasRequiredAccessLevel
    requiresAccessLevel
    requiredAccessLevels {
      id
      name
    }
    messages
  }
}

`;
