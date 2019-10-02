const gql = require('graphql-tag');

module.exports = gql`

fragment NewsletterContentListFragment on Content {
  id
  type
  name(input: { mutation: Email })
  teaser(input: { mutation: Email, maxLength: 500, useFallback: false, truncatedSuffix: "..." })
  canonicalPath
  primaryImage {
    id
    src
    alt
    isLogo
  }
}

`;
