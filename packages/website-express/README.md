# BaseCMS Express Website Server
Provides a _factory_ for creating an Express web server for use with BaseCMS websites. This package does not directly initialize the server nor does it listen for requests. Instead, it provides the stitched GraphQL API and other common website routes within Express. The requiring application of this library must create and init the server. As such, this should be considered a low-level package.

## Usage
To utilize the Express website server, follow these steps
- Require the factory in your Node app
- Using the factory, create the `app` (with options, if desired)
- Instruct the `app` to listen for web requests

**Note:** You _must_ have the `graphql` peer dependency installed in your project. To do so, run `yarn add graphql`.

For example:

```js
// Require the Express app factory.
const website = require('@base-cms/website-express');

const { log } = console;

// Create the express app.
const app = website({
  graphql: { uri: 'https://graphql.[your-website].com' },
});

// If you need additional options, you can also call...
/*
const app = website({
  graphql: { uri: 'https://graphql.[your-website].com' },
  helmet: {}, // Optional helmet options
  compression: {}, // Optional compression options
});
*/

// Listen on whatever port you define...
const PORT = 8100;
app.listen(PORT, () => log(`> Ready on http://0.0.0.0:${PORT}`));
```

## Endpoints
Once the web server is running, the following endpoints will be available:
- `/graphql`: the _local_ BaseCMS GraphQL API that is stitched from the _remote_ source

