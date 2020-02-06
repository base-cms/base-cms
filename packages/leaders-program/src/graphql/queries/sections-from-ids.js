import gql from 'graphql-tag';

export default gql`

query LeadersSectionsFromIds($sectionIds: [Int!]!) {
  websiteSections(input: {
    includeIds: $sectionIds,
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
