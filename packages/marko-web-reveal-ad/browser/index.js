const RevealAdListener = () => import(/* webpackChunkName: "reveal-ad-listener" */ './listener.vue');

export default (Browser) => {
  Browser.register('RevealAdListener', RevealAdListener);
};
