# BaseCMS Apollo GraphQL SSR Client for Express
Creates a per-request Apollo GraphQL client via Express middleware.

## Installation
This package is dependent on the `graphql` library.
```
yarn add @base-cms/express-apollo graphql@^14.0.0
```

## Usage
To use, apply the middleware to your Express app (or router instance):
```js
const express = require('express');
const { apolloClient } = require('@base-cms/express-apollo');

const app = express();

app.use(apolloClient('http://your-base-cms-graphql-uri'));

// Apollo is now availabe on the req object, as well as res.locals
app.get('/', (req, res) => {
  const { apollo } = req;
  const query = '{ ping }';
  apollo.query({ query }).then(result => res.json(result));
});

app.listen(1234);
```
