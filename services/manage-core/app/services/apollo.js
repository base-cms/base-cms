import ApolloService from 'ember-apollo-client/services/apollo';
import { computed } from '@ember/object';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '@base-cms/graphql-fragment-types';

export default ApolloService.extend({
  clientOptions: computed(function() {
    return {
      link: this.get('link'),
      cache: new InMemoryCache({ fragmentMatcher: this.get('fragmentMatcher') }),
    };
  }),

  fragmentMatcher: computed(function() {
    return new IntrospectionFragmentMatcher({
      introspectionQueryResultData
    });
  }),
});