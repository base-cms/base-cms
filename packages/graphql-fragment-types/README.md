# BaseCMS GraphQL Fragment Types
Provides fragment types for the BaseCMS GraphQL API. For use with Apollo GraphQL clients.

## Usage
```js
import introspectionQueryResultData from '@base-cms/graphql-fragment-types';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });
const cache = new InMemoryCache({ fragmentMatcher });

export default new ApolloClient({ cache });
```

## Developing / Building
To build a new version of `types.json`, run the following command inside the monorepo.
```
GRAPHQL_URL=[the graphql url to build from] node packages/graphql-fragment-types/build.js
```
