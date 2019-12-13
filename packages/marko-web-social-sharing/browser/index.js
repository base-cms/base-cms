const SocialSharing = () => import(/* webpackChunkName: "marko-web-social-sharing" */ './social-sharing.vue');

export default (Browser) => {
  const { EventBus } = Browser;
  Browser.register('SocialSharing', SocialSharing, {
    provide: { EventBus },
  });
};
