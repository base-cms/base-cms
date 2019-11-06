import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fragmentMatcher from './fragment-matcher';
import { name, version } from '../../package.json';

export default ({ uri, headers }) => new ApolloClient({
  name,
  version,
  link: createHttpLink({ uri, headers }),
  cache: new InMemoryCache({ fragmentMatcher }),
});
