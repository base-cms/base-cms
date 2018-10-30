# Bootstrap Design Components for Base4 NextJS Websites
Adds Boostrap component support for Base4 NextJS websites.

## Installation
This package requires the `@base-cms/base4-website-nextjs` package, along with its peer dependencies. To install:
```
yarn add @base-cms/base4-website-nextjs @base-cms/base4-website-nextjs-bootstrap bootstrap [...additional peers]
```

Once installed, add the following to your `next.config.js`:

```js
// next.config.js
const withSass = require('@base-cms/base4-website-nextjs-bootstrap/next-config');
const withBaseWebsite = require('@base-cms/base4-website-nextjs/next-config');

module.exports = withSass(withBaseWebsite({
  // additional config options...
}));
```
You must also create a `postcss.config.js` file in your project root:
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
