import gql from 'graphql-tag';

export default gql`

query LeadersSectionsFromTaxonomy($taxonomyIds: [Int!]!) {
  websiteSections(input: {
    taxonomyIds: $taxonomyIds,
    pagination: { limit: 0 },
    sort: { field: name, order: asc },
  }) {
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
