const gql = require('graphql-tag');

module.exports = gql`

fragment NewsletterContentListFragment on Content {
  id
  type
  name(input: { mutation: Email })
  teaser(input: { mutation: Email, useFallback: false, maxLength: null })
  primaryImage {
    id
    src
    alt
    isLogo
  }
  published
  ... on ContentTextAd {
    body(input: { mutation: Email })
    linkText
  }
}

`;
