# Core NextJS Components for BaseCMS Websites

## Install
This package must be used in conjunction with NextJS. In your project root, install this package along with its peer dependencies (this assumes a clean/empty project directory):
```
yarn add @base-cms/nextjs-web next@7.0.2 apollo-client@^2.4.0 graphql@^14.0.0 graphql-tag@^2.10.0 react@^16.6.0 react-apollo@^2.3.0 react-dom@^16.6.0
```

## Setup
Once the dependencies are installed, a bare minimum Next+BaseCMS setup is required.

### Next Config
Create a `next.config.js` file in the project root and import the BaseCMS next config:
```js
// next.config.js
const withBaseWebsite = require('@base-cms/nextjs-web/next-config');

module.exports = withBaseWebsite({
  distDir: '../.next/build', // Or whatever directory you'd like
  publicRuntimeConfig: {
    // This assumes that you do _not_ want section page paths prefixed with `/section`. Omit this to preserve `/section` prefixing.
    sectionRoutePrefix: '',
  },
  // Any additional/optional config requirements...
});

```
By default the `withBaseWebsite` config will add the `NODE_ENV` value via Webpack's `EnvironmentPlugin` and add support for importing `.graphql` files.

### Setup Default Routes
Routes are named and support pattern matching. A default set of routes need to be created in order for the site to initially function. By default, these are defined in the `site/routes.js` file (the `site` path can be overriden - see Next Server below for details). At bare minimum, a home or index route must be created:
```js
// site/routes.js
module.exports = [
  {
    name: 'home',
    pattern: '/',
    page: 'index',
  },
];
```
The `page` property informs Next which page component to load. By default, page components are located in the `site/pages` directory. A corresponding page must also be created for each route. A contrived example for `index` would be:
```js
// site/pages/index.jsx
import React from 'react';

const IndexPage = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);

export default IndexPage;
```
### Site Config
A configuration file is used throughout the website to display common elements (such as name, logo, nav items, etc.). By default, the config is defined in the `site/config.js` file (the `site` path can be overriden - see Next Server below for details). An baseline config would look similar to this:
```js
// site/config.js
module.exports = {
  name: 'Officer',
  logo: '//cdn.officer.com/files/base/cygnus/ofcr/image/static/logo/site_logo.png',
  primaryNavItems: [
    { to: '/tactical', label: 'Tactical' },
    { to: '/training-careers', label: 'Training & Careers' },
    { to: '/on-the-street', label: 'On the Street' },
    { to: '/investigations', label: 'Investigations' },
    { to: '/command-hq', label: 'Command/HQ' },
    { to: '/directory', label: 'Product Guide' },
    { to: 'https://forum.officer.com', label: 'Forums' },
  ],
  secondaryNavItems: [
    { to: '/features/honoring-the-fallen', label: 'Honoring the Fallen' },
    { to: '/magazine', label: 'Publications' },
    { to: '/subscribe', label: 'Subscribe' },
    { to: '/advertise', label: 'Advertise' },
    { to: '/contact-us', label: 'Contact Us' },
  ],
};

```

### Application Higher-Order Components
The website uses Apollo GraphQL, route definitions, and site configuration globally. To facilitate this, create a `site/pages/_app.jsx` file with the following setup. This is required for the website to function properly.
```js
// site/pages/_app.jsx
import {
  WebsiteApp,
  withApollo,
  withRouting,
  withSiteConfig,
} from '@base-cms/nextjs-web/app';
// Your route definitions from above... assumes site/routes.js
import routeDefs from '../routes';
// Your site config from above... assumes site/config.js
import config from '../config';

export default withApollo(
  withRouting(routeDefs)(
    withSiteConfig(config)(
      WebsiteApp,
    ),
  ),
);
```

### Next Server
The website utilizes a custom Express server for SSR and proxying to remote BaseCMS services (such as GraphQL, RSS, etc.). To enable this, create a `server.js` file in the project root and initialize the server:
```js
// server.js
const startServer = require('@base-cms/nextjs-web/server');

// Your website routes. These are required.
const routeDefs = require('./site/routes');
// The port the website should run on
const port = 3005;
// Your external services URL (for GraphQL, RSS, Sitemaps, etc).
// This is required.
const serviceUrl = 'https://[account].4.base-cms.io/[group]';

const boot = async () => {
  // Start the server.
  await startServer({
    port,
    routeDefs,
    serviceUrl,
  });
  console.log(`> Ready on http://0.0.0.0:${port}`);
};

// Boot and immediately throw if there are errors.
boot().catch(e => setImmediate(() => { throw e; }));
```
If you need to override the default `./site` working directory, set the `dir` option of `startServer` to a different path, for example `./app` or `./my-cool-site`.

### Running
Once the above steps are completed you can run the website. From the project root, execute `NODE_ENV=development node server.js`. Once booted, the site will be available on the `port` specified in the `server.js` file. You can optionally add a helper script in your `package.json` file:
```json
{
  "scripts": {
    "dev": "NODE_ENV=development node server.js"
  }
}
```
Doing so will allow you execute `yarn dev`.

## Development
Anytime changes are made, you must rebuild the dist folder. From the monorepo root, run:
```
scripts/workspace.sh @base-cms/nextjs-web run build
```
This will build both CommonJS and ES Module versions of the source using Rollup.
