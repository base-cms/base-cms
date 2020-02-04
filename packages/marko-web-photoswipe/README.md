# BaseCMS Marko Wrapper for Photoswipe

## Installation

1. Include `@base-cms/marko-web-photoswipe` as a project/website dependency.

2. Include the Browser plugin.
```js
// your-site/browser/index.js
import PhotoSwipe from '@base-cms/marko-web-photoswipe/browser';

PhotoSwipe(Browser);

export default Browser;
```

3. Include the styles.
```scss
// your-site/server/styles/index.scss
@import "../../node_modules/@base-cms/marko-web-photoswipe/scss/main";
```

4. If you're using the default theme (or something similar) you'll need to adjust the photoswipe z-index:
```scss
$pswp__root-z-index: $theme-site-header-z-index + 1 !default;
@import "../../node_modules/@base-cms/marko-web-photoswipe/scss/main";
```

## Usage

### Create a Content Image Gallery
You must specify a body gallery ID as well as an image selector.

1. On the page contents, append a unique gallery ID and display some images, e.g.:
```marko
<default-theme-page-contents attrs={ "data-gallery-id": content.id }>
  <marko-web-page-image width=720 obj=content.primaryImage />
  <marko-web-content-body obj=content />
</default-theme-page-contents>
```

2. Immediately after this block, load the gallery component:
```marko
import { getAsArray } from "@base-cms/object-path";

$ const images = resolved.getEdgeNodesFor("images");

<marko-web-photoswipe-images images=images>
  <@props thumbnail-click-selectors=`[data-gallery-id="${id}"] [data-image-id]` />
</marko-web-photoswipe-images>
```

3. Make sure you're returning the images from GraphQL
```js
const gql = require('graphql-tag');

module.exports = gql`
fragment ContentPageFragment on Content {
  id
  name
  images(input:{ pagination: { limit: 100 }, sort: { order: values } }) {
    edges {
      node {
        id
        src
        alt
        displayName
        caption
        credit
      }
    }
  }
}
`;

```
