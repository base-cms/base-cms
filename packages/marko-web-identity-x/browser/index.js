const loader = require('@base-cms/identity-x/browser');

const IdentityXAuthenticate = () => import(/* webpackChunkName: "identity-x-authenticate" */ '@base-cms/identity-x/browser/authenticate.vue');
const IdentityXLogout = () => import(/* webpackChunkName: "identity-x-logout" */ '@base-cms/identity-x/browser/logout.vue');
const IdentityXForm = () => import(/* webpackChunkName: "identity-x-form" */ '@base-cms/identity-x/browser/form.vue');

export default (Browser, config) => {
  const { EventBus } = Browser;

  const client = loader(config);

  Browser.register('IdentityXAuthenticate', IdentityXAuthenticate, {
    provide: { client },
    on: { action: EventBus },
  });
  Browser.register('IdentityXLogout', IdentityXLogout, {
    provide: { client },
    on: { action: EventBus },
  });
  Browser.register('IdentityXForm', IdentityXForm, {
    provide: { client },
    on: { action: EventBus },
  });
};
