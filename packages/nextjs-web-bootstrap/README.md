# Bootstrap Design Components for BaseCMS NextJS Websites
Adds Bootstrap component support for BaseCMS NextJS websites.

## Installation
This package requires the `@base-cms/nextjs-web` package, along with its peer dependencies. To install:
```
yarn add @base-cms/nextjs-web @base-cms/nextjs-web-bootstrap bootstrap [...additional peers]
```

## Setup

### Next Config
Once installed, add the following to your `next.config.js`:
```js
// next.config.js
const withSass = require('@base-cms/nextjs-web-bootstrap/next-config');
const withWebsite = require('@base-cms/nextjs-web/next-config');

module.exports = withSass(withBaseWebsite({
  // additional config options...
}));
```

### PostCSS + Autoprexifer Config
You must also create a `postcss.config.js` file in your project root. This adds support for the Autoprexifer plugin which Bootstrap requires.
```js
// postcss.config.js
module.exports = (ctx) => {
  const plugins = {
    precss: {},
    autoprefixer: {
      ...ctx.options.autoprefixer,
      cascade: false,
    },
  };
  return { plugins };
};
```

### Browserlist
Finally, the Browserlist file `.browserslistrc` must be created in the project root. The following demonstrates Bootstrap 4's current browser settings:
```
>= 1%
last 1 major version
not dead
Chrome >= 45
Firefox >= 38
Edge >= 12
Explorer >= 10
iOS >= 9
Safari >= 9
Android >= 4.4
Opera >= 30
```

## Usage
Once installed, create a SASS file of your choosing (generally in the `site` folder) and import into your NextJS+BaseCMS website. For example...
```scss
// site/styles/app.scss
// Setup custom bootstrap variables here, or in an external file.
@import "~bootstrap/scss/bootstrap";
```
Then, inside the `_app` page:
```js
// site/pages/_app.jsx
import '../styles/app.scss';
import {
  WebsiteApp,
  withApollo,
  withRouting,
  withSiteConfig,
} from '@base-cms/website-nextjs/app';
// everything else...
```
