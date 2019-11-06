# BaseCMS Marko Wrapper for the Leaders Program

## Installation

1. Include `@base-cms/marko-web-leaders` as a project/website dependency.

2. Include the Browser plugin.
```js
// your-site/browser/index.js
import Leaders from '@base-cms/marko-web-leaders/browser';

Leaders(Browser);

export default Browser;
```

3. Include the styles.
```scss
// your-site/server/styles/index.scss
@import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600,700&display=swap");
@import "../../node_modules/@base-cms/marko-web-leaders/scss/leaders";
```

4. Include the dropdown portal component in your template or document root. _Include immediately after the opening `<body>` tag!_ **<< Don't forget this step >>**
```marko
<!-- your-site/server/components/document.marko -->
<marko-web-document ...input>
  <@head>
    <!-- ... head components here -->
  </@head>
  <@above-container>
    <marko-web-leaders-dropdown-portal />
    <!-- ... other components here -->
    <${input.aboveContainer} />
  </@above-container>
</marko-web-document>
```

5. Include the `<marko-web-leaders>` component where you'd like it displayed.
```marko
<!-- your-site/server/templates/index.marko -->
<marko-web-leaders props={
  sectionAlias: "leaders",
  open: null,
  expanded: false,
  headerImgSrc: "https://img.packworld.com/files/base/pmmi/all/leaders/pw.png",
  headerImgAlt: "Leaders in Packaging 2019",
  columns: 1,
  offsetTop: 105,
  mediaQueries: [
    { prop: "open", value: "right", query: "(min-width: 1490px)" },
    { prop: "columns", value: 2, query: "(min-width: 700px)" },
    { prop: "displayCallout", value: false, query: "(max-width: 660px)" },
  ],
}/>
```
