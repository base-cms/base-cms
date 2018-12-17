# BaseCMS Express Website Server

## Usage
To utilize the Express website server, require the module, instantiate the app (with [optional] options), and listen. For example:

```js
const website = require('@base-cms/website-express');

const { log } = console;

// Build the express app.
const app = website();

// If you need options, you can also call...
/*
const app = website({
  helmet: {}, // Optional helmet options
  compression: {}, // Optional compression options
});
*/

// Listen on whatever port you define...
const PORT = 8100;
app.listen(PORT, () => log(`> Ready on http://0.0.0.0:${PORT}`));
```

## Endpoints
Once the web server is running, the GraphQL API will be available on `/graphql`.

## Environment Variables
**Required**
  - `GRAPHQL_URL`: Specifies the _remote_ GraphQL URL to access. For example, `https://graphql.[your-domain-name].com`

**Optional**
  - `LOCAL_GRAPHQL_ENDPOINT`: Allows you to override the GraphQL API endpoint that will be use _locally_ (default: `/graphql`)
  - `CONTENT_CANONICAL_PATHS`: A JSON string that specifies how Content paths are generated for the website (default: `["sectionAlias", "type", "id", "slug"]`)
