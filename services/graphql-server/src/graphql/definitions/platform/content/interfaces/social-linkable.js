const gql = require('graphql-tag');

module.exports = gql`

interface SocialLinkable {
  socialLinks: [EntityStubSocial]! @projection @arrayValue
}

`;
