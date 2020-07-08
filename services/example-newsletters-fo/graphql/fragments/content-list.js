const gql = require('graphql-tag');

module.exports = gql`

fragment NewsletterContentListFragment on Content {
  id
  type
  typeTitle: type(input: { format: titleize })
  name(input: { mutation: Email })
  teaser(input: { mutation: Email, useFallback: false, maxLength: null })
  primaryImage {
    id
    src
    alt
  }
  images {
    edges {
      node {
        id
        src
        alt
        isLogo
      }
    }
  }
  labels
  company {
    id
    name
  }
  published
  ... on ContentTextAd {
    body(input: { mutation: Email })
    linkText
  }
  ... on ContentPromotion {
    body(input: { mutation: Email })
    linkText
  }
}

`;
