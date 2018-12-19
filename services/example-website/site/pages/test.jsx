import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
  query PublishedContent {
    allPublishedContent {
      edges {
        node {
          id
          type
          publishedDate
          company {
            id
            name
          }
          ... on Authorable {
            authors {
              totalCount
            }
          }
          name
        }
      }
    }
  }
`;

const TestPage = () => (
  <div>
    <h1>Test Page</h1>
    <p>
      <Link href="/">
        <a>Home Page</a>
      </Link>
    </p>

    <Query query={query}>
      {({ loading, data, error }) => {
        if (loading) return <span>Loading...</span>;
        if (error) {
          return (
            <span>
              Error
              {' '}
              {error.message}
            </span>
          );
        }
        return (
          <ul>
            {data.allPublishedContent.edges.map(({ node }) => (
              <li key={node.id}>
                {node.name}
                {' - '}
                {node.publishedDate}
                {' - '}
                (
                {node.type}
                )
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);

export default TestPage;
