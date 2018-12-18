# BaseCMS GraphQL Client and Schema Stitching
Creates a server-side client, link, and remote schema for the BaseCMS GraphQL API. Can be used as a low-level dependency in other projects.

## Usage
```js
const stitch = require('@base-cms/graphql-stitching');

// The stitching builder is an async, singleton function.
// You _must_ pass the remote BaseCMS uri when building the schema.
const run = async ({ uri }) => {
  // The schema can now be used by ApolloServer.
  // The graph client can now be used by a backend node application.
  const { schema, client } = await stitch({ uri });
};
run();
```

## Parameters
Besides the required `uri` parameter, the following optional parameters may be passed:
- `contentCanonicalPaths`: an `array` of `strings` that specify how Content paths will be generated. Default: `['sectionAlias', 'type', 'id', 'slug']`
