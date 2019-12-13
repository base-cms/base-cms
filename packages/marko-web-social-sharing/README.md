# BaseCMS Marko Web Social Sharing Components

## Installation

1. Include `@base-cms/marko-web-social-sharing` as a project/website dependency.

2. Include the Browser plugin.
```js
// your-site/browser/index.js
import SocialSharing from '@base-cms/marko-web-social-sharing/browser';

SocialSharing(Browser);
// ...

export default Browser;
```

3. Include the default styles:
```scss
@import "../../node_modules/@base-cms/marko-web-social-sharing/scss/buttons";
```

## Usage

Include the sharing component where you'd like the icons to appear:

```marko
<marko-web-social-sharing
  path=content.siteContext.path
  providers=["email", "facebook", "linkedin", "twitter", "pinterest", "print"]
/>
```
