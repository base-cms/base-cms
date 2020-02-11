const Authenticate = () => import(/* webpackChunkName: "identity-x-authenticate" */ './authenticate.vue');
const Logout = () => import(/* webpackChunkName: "identity-x-logout" */ './logout.vue');
const Login = () => import(/* webpackChunkName: "identity-x-login" */ './login.vue');
const Profile = () => import(/* webpackChunkName: "identity-x-profile" */ './profile.vue');
const Form = () => import(/* webpackChunkName: "identity-x-form" */ './form.vue');

export default (Browser, {
  CustomLoginComponent,
  CustomFormComponent,
} = {}) => {
  const LoginComponent = CustomLoginComponent || Login;
  const FormComponent = CustomFormComponent || Form;

  const { EventBus } = Browser;
  Browser.register('IdentityXAuthenticate', Authenticate, {
    on: { action: (...args) => EventBus.$emit('identity-x-authenticate', ...args) },
  });
  Browser.register('IdentityXLogin', LoginComponent, {
    on: { action: (...args) => EventBus.$emit('identity-x-logout', ...args) },
  });
  Browser.register('IdentityXLogout', Logout, {
    on: { action: (...args) => EventBus.$emit('identity-x-logout', ...args) },
  });
  Browser.register('IdentityXProfile', Profile, {
    on: { action: (...args) => EventBus.$emit('identity-x-profile', ...args) },
  });
  Browser.register('IdentityXForm', FormComponent, {
    on: { action: (...args) => EventBus.$emit('identity-x-submit', ...args) },
  });
};
