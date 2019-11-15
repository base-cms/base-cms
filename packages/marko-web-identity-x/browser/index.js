const IdentityXAuthenticate = () => import(/* webpackChunkName: "identity-x-authenticate" */ './authenticate.vue');
const IdentityXLogout = () => import(/* webpackChunkName: "identity-x-logout" */ './logout.vue');
const IdentityXForm = () => import(/* webpackChunkName: "identity-x-form" */ './form.vue');

export default (Browser, CustomFormComponent) => {
  const FormComponent = CustomFormComponent || IdentityXForm;
  const { EventBus } = Browser;
  Browser.register('IdentityXAuthenticate', IdentityXAuthenticate, {
    on: { action: (...args) => EventBus.$emit('identity-x-authenticate', ...args) },
  });
  Browser.register('IdentityXLogout', IdentityXLogout, {
    on: { action: (...args) => EventBus.$emit('identity-x-logout', ...args) },
  });
  Browser.register('IdentityXForm', FormComponent, {
    on: { action: (...args) => EventBus.$emit('identity-x-submit', ...args) },
  });
};
