# BaseCMS Marko/Vue Icon Components
Icon components for BaseCMS websites.

## Install
Add `@base-cms/marko-web-icons` as a dependency to your website project.

## Usage
Icons can be used on the server (as a Marko component) or the browser (as a Vue component).

### On The Server
Call the `<icon>` component within your Marko template. The `name` input/attribute is required. For example:
```marko
<!-- Your template file -->
<icon name="alert" />
```
See the `svg` folder for a complete list of available icons.

Optional input/attributes:
- `tag`: changes the wrapping HTML element. Default `<span>`
- `blockName`: changes the wrapping BEM block class. Default `marko-web-icon`
- `modifiers`: additional BEM modifiers (as an array) to apply the icon wrapper. Default `[]`
- `class`: an additional class name string to apply to the icon wrapper. Default `undefined `

### In The Browser
Import the icon component into your Vue component and then use it within your template. For example:
```vue
// Your Vue component
<template>
  <icon-alert />
</template>
<script>
import IconAlert from '@base-cms/marko-web-icons/browser/alert.vue';

export default {
  components: { IconAlert },
  // The rest of your component...
}
</script>
```
See the `browser` folder for a complete list of available icons (mirrors the `svg` folder).

Optional props:
- `tag`: changes the wrapping HTML element. Default `<span>`
- `blockName`: changes the wrapping BEM block class. Default `marko-web-icon`
- `modifiers`: additional BEM modifiers (as an array) to apply the icon wrapper. Default `[]`
- `className`: an additional class name string to apply to the icon wrapper. Default `null`

### Importing Styles (SASS/SCSS)
This package comes with baseline SASS variables and styles. To use them, import them into your website's style file:
```scss
// Your main website styles file.

// Override any desired variables here...

@import "@base-cms/marko-web-icons/scss/icons";
```

By default, a width/height of `1rem` will be applied to all icons classed with `marko-web-icon` (applied by default). In addition, the SVG will be filled with black and a ease transition will be applied. Additional (optional) modifiers include:
- `md`
- `lg`
- `xl`
- `light`
- `dark`
- `shadow`

For example, for a light, extra large icon with drop shadow, you would call the icon as follows:
```vue
// In Vue:
<template>
  <icon-alert modifiers=["xl", "light", "shadow"] />
</template>
```
```marko
// In Marko:
<icon name="alert" modifiers=["xl", "light", "shadow"] />
```

Finally, any icon not specifically set to `light` or `dark` that also matches a brand (e.g. `facebook`) will have its brand color applied. See the `$marko-web-icon-brand-colors` map variable within `scss/_variables.scss` for a list of supported brands.

## Development
Anytime a new icon `svg` file is added (or the wrapping Vue component template changes), run the `build.js` file found in the project root. This will generate a new Vue file for the icon.
