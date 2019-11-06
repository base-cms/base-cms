import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fragmentMatcher from '@base-cms/graphql-fragment-types/fragment-matcher';

export default new VueApollo({
  defaultClient: new ApolloClient({
    link: createHttpLink({ uri: '/__graphql' }),
    cache: new InMemoryCache({ fragmentMatcher }),
  }),
});
