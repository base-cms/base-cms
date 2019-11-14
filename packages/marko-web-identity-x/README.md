# BaseCMS Marko Wrapper for IdentityX

## Installation

1. Include `@base-cms/marko-web-identity-x` as a project/website dependency.

2. Include IdentityX tenant configuration within your site
```js
// your-site/config/identity-x.js
const IdentityX = require('@base-cms/marko-web-identity-x/config');

const config = new IdentityX('<MY-APPLICATION-ID>');
module.exports = config;
```

3. Include the IdentityX router
```js
// your-site/server/routes/index.js
const IdentityX = require('@base-cms/marko-web-identity-x/router');

module.exports = (app) => {
  IdentityX(app);

  // ...
}
```

4. Include the Browser plugin.
```js
// your-site/browser/index.js
import IdentityX from '@base-cms/marko-web-identity-x/browser';

IdentityX(Browser);
// ...

export default Browser;
```

5. Include the styles.
```scss
// your-site/server/styles/index.scss
@import "../../node_modules/@base-cms/marko-web-identity-x/scss/form";
```

## Usage

Include the `<marko-web-identity-x-form>` component where you'd like give the user the ability to sign in.
```marko
<!-- your-site/server/templates/sign-in.marko -->
<marko-web-identity-x-form />
```

Include the `<marko-web-identity-x-context>` component where you'd like access to IdentityX context.
```marko
<!-- your-site/server/templates/some-page.marko -->
<marko-web-identity-x-context|{ user, hasUser }|>
  <if(hasUser)>
    <h1>Hello ${user.name}!</h1>
  </if>
</identity-x>
```

Include the `<marko-web-identity-x-access>` component where you'd like to ensure access levels are met:
```marko
<!-- your-site/server/templates/content/index.marko -->
$ const { isRequired, accessLevels } = getAsObject(content, 'userRegistration');
<marko-web-identity-x-access|context|
  enabled=isRequired
  required-access-level-ids=accessLevels
>
  $ const {
    canAccess,
    isLoggedIn,
    requiresAccessLevel,
    hasRequiredAccessLevel,
    messages,
  } = context;
  <if(!canAccess)>
    <if(isLoggedIn && !hasRequiredAccessLevel)>
      $!{messages.loggedInNoAccess}
    </if>
    <else-if(!isLoggedIn && requiresAccessLevel)>
      $!{messages.loggedOutNoAccess}
    </else-if>
    <else-if(!isLoggedIn)>
      <h5>You must be logged-in to access this content.</h5>
      <cms-browser-component name="IdentitySignInForm" />
    </else-if>
  </if>
  <else>
    <p>This is secret content only some can see!</p>
  </else>
</marko-web-identity-x-access>
```
