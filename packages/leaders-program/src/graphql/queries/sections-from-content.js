import gql from 'graphql-tag';

export default gql`

query LeadersSectionsFromContent($taxonomyIds: [Int!]!, $relatedSectionIds: [Int!]!) {
  websiteSections(input: {
    relatedSectionIds: $relatedSectionIds,
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
