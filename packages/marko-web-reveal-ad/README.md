# BaseCMS Marko Web Reveal Ad Components

## Installation
1. Add `@base-cms/marko-web-revel-ad` to your project/site.

2. Include the Browser plugin.
  ```js
  // your-site/browser/index.js
  import RevealAd from '@base-cms/marko-web-reveal-ad/browser';

  RevealAd(Browser);

  export default Browser;
  ```

3. Include the styles
  ```scss
  // your-site/server/styles/index.scss
  @import "../../node_modules/@base-cms/marko-web-reveal-ad/scss/reveal-ad";
  ```

4. Load the listener component on all pages, as close to the opening `<body>` tag as possible. This is usually handled in a common site `document.marko` component
  ```marko
  <marko-web-document ...input>
    <@head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/site.webmanifest">
      <marko-web-gam-init />
      <${input.head} />
      <marko-web-gam-enable />
      <marko-web-gam-targeting key-values={ uri: req.path } />
    </@head>
    <@above-container>
      <marko-web-reveal-ad-listener />
      <default-theme-site-header />
      <default-theme-site-menu />
      <${input.aboveContainer} />
    </@above-container>
  </marko-web-document>
  ```
