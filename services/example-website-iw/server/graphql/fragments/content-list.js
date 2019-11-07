const gql = require('graphql-tag');

module.exports = gql`

fragment WebsiteContentListFragment on Content {
  id
  type
  typeTitled: type(input: { format: titleize })
  shortName
  teaser(input: { useFallback: false, maxLength: null })
  canonicalPath
  published
  company {
    id
    type
    name
    canonicalPath
  }
  primarySection {
    id
    name
    fullName
    canonicalPath
  }
  primaryImage {
    id
    src
    alt
    isLogo
  }
  userRegistration {
    isRequired
  }
  ... on Authorable {
    authors {
      edges {
        node {
          id
          name
          type
          canonicalPath
        }
      }
    }
  }
  ... on ContentPromotion {
    linkText
    linkUrl
  }
  ... on ContentContact {
    title
    phone
    publicEmail
  }
  ... on ContentWebinar {
    startDate
  }
  ... on ContentEvent {
    startDate
    endDate
  }
}

`;
