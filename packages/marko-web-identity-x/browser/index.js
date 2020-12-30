const Authenticate = () => import(/* webpackChunkName: "identity-x-authenticate" */ './authenticate.vue');
const Logout = () => import(/* webpackChunkName: "identity-x-logout" */ './logout.vue');
const Login = () => import(/* webpackChunkName: "identity-x-login" */ './login.vue');
const Profile = () => import(/* webpackChunkName: "identity-x-profile" */ './profile.vue');
const CommentStream = () => import(/* webpackChunkName: "identity-x-comment-stream" */ './comments/stream.vue');

export default (Browser, {
  CustomLoginComponent,
  CustomAuthenticateComponent,
  CustomLogoutComponent,
  CustomProfileComponent,
  CustomCommentStreamComponent,
} = {}) => {
  const LoginComponent = CustomLoginComponent || Login;
  const AuthenticateComponent = CustomAuthenticateComponent || Authenticate;
  const LogoutComponent = CustomLogoutComponent || Logout;
  const ProfileComponent = CustomProfileComponent || Profile;
  const CommentStreamComponent = CustomCommentStreamComponent || CommentStream;

  const { EventBus } = Browser;
  Browser.register('IdentityXAuthenticate', AuthenticateComponent, {
    on: { action: (...args) => EventBus.$emit('identity-x-authenticate', ...args) },
  });
  Browser.register('IdentityXLogin', LoginComponent, {
    on: { action: (...args) => EventBus.$emit('identity-x-logout', ...args) },
  });
  Browser.register('IdentityXLogout', LogoutComponent, {
    on: { action: (...args) => EventBus.$emit('identity-x-logout', ...args) },
  });
  Browser.register('IdentityXProfile', ProfileComponent, {
    on: { action: (...args) => EventBus.$emit('identity-x-profile', ...args) },
  });
  Browser.register('IdentityXCommentStream', CommentStreamComponent);
};
