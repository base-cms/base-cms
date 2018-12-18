const { HttpLink } = require('apollo-link-http');
const { ApolloLink } = require('apollo-link');
const { setContext } = require('apollo-link-context');
const fetch = require('isomorphic-unfetch');

let link;
const defaultCanonicalPaths = ['sectionAlias', 'type', 'id', 'slug'];

module.exports = ({
  uri,
  contentCanonicalPaths,
}) => {
  const paths = Array.isArray(contentCanonicalPaths)
    ? contentCanonicalPaths
    : defaultCanonicalPaths;

  if (!link) {
    link = ApolloLink.from([
      /**
       *
       */
      setContext(() => ({
        headers: {
          'x-content-canonical-paths': paths.join(','),
        },
      })),

      /**
       *
       */
      new HttpLink({
        uri,
        fetch,
      }),
    ]);
  }
  return link;
};
