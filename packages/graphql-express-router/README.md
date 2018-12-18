# BaseCMS GraphQL Express Routing Middleware
Provides a _factory_ for creating an ApolloServer+Express router that stitches to a remote BaseCMS GraphQL API. This is a low-level package that is intended for use in larger projects.

## Usage
1. Install `express` and `graphql`. See `package.json` for specifics.
2. Require the router factory in your app.
3. Create the router and mount it to Express.

For example:
```js
const baseGraphQL = require('@base-cms/graphql-express-router');
const express = require('express');

const app = express();

// Create the Express router instance.
// The BaseCMS remote API `uri` parameter is required.
// The Express `app` instance is required.
baseGraphQL({ app, uri: 'https://graphql.your-website.com' });

// The API will now be available on http://localhost:2000/graphql.
app.listen(2000);

```

### Parameters
In addition to the required `app` and `uri` parameters, you can also specify the following, optional params:
- `endpoint`: a `string` specifying where the _local_ GraphQL endpoint will be mounted to. Default `/graphql`
- `contentCanonicalPaths`: an `array` of `strings` specifying how Content paths should be generated. Defers to the `@base-cms/graphql-stitching` package for the default value.
- `serverOpts`: an `object` of optional server parameters to pass to the `ApolloServer` instance. Default: `{}`
