import gql from 'graphql-tag';

export default gql`

query LeadersSectionsFromTaxonomy($taxonomyIds: [Int!]!) {
  websiteSections(input: { taxonomyIds: $taxonomyIds }) {
    edges {
      node {
        id
        name
        hierarchy {
          id
          alias
        }
      }
    }
  }
}

`;
