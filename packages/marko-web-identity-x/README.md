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

3. Include the IdentityX router **before all other routes!**
```js
// your-site/server/routes/index.js
const IdentityX = require('./identity-x');

module.exports = (app) => {
  IdentityX(app);
  // ...
};
```
```js
// your-site/server/routes/identity-x.js
const IdentityX = require('@base-cms/marko-web-identity-x/router');
const IdentityXConfig = require('../../config/identity-x');

module.exports = (app) => {
  IdentityX(app, IdentityXConfig);
};
```

4. Create `login`, `logout`, `authenticate`, and `register` routes & templates. These templates must include the relevant `<marko-web-identity-x-form-...>` component.
```js
// your-site/server/routes/identity-x.js
const IdentityX = require('@base-cms/marko-web-identity-x/router');
const IdentityXConfig = require('../../config/identity-x');
const authenticate = require('../templates/user/authenticate');
const login = require('../templates/user/login');
const logout = require('../templates/user/logout');
const register = require('../templates/user/register');

module.exports = (app) => {
  IdentityX(app, IdentityXConfig);

  app.get('/user/authenticate', (req, res) => {
    res.marko(authenticate);
  });

  app.get('/user/login', (req, res) => {
    res.marko(login);
  });

  app.get('/user/logout', (req, res) => {
    res.marko(logout);
  });

  app.get('/user/register', (req, res) => {
    res.marko(register);
  });
};

```
```marko
<marko-web-default-page-layout>
  <@page>
    <marko-web-identity-x-form-authenticate />
  </@page>
</marko-web-default-page-layout>
```

5. Include the Browser plugin.
```js
// your-site/browser/index.js
import IdentityX from '@base-cms/marko-web-identity-x/browser';

IdentityX(Browser);
// ...

export default Browser;
```
<!--
5. Include the styles.
```scss
// your-site/server/styles/index.scss
@import "../../node_modules/@base-cms/marko-web-identity-x/scss/form";
``` -->

## Usage

Include the `<marko-web-identity-x-form-authenticate>` component in the template where users land after authenticating (/user/authenticate).

Include the `<marko-web-identity-x-form-login>` component to display the login form.

Include the `<marko-web-identity-x-form-register>` component to display the register form.

Include the `<marko-web-identity-x-form-logout>` component to display the logout form.

Include the `<marko-web-identity-x-context>` component where you'd like access to IdentityX context.
```marko
<!-- your-site/server/templates/some-page.marko -->
<marko-web-identity-x-context|{ user, hasUser }|>
  <if(hasUser)>
    <h1>Hello ${user.givenName}!</h1>
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
