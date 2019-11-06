import gql from 'graphql-tag';

export default gql`

query AllLeadersSections($sectionAlias: String!) {
  websiteSectionAlias(input: { alias: $sectionAlias }) {
    id
    name
    children(input: { sort: { field: name, order: asc }, pagination: { limit: 0 } }) {
      edges {
        node {
          id
          name
          children(input: { sort: { field: name, order: asc }, pagination: { limit: 0 } }) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
}

`;
