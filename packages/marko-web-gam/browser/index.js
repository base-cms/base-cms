const GAMFixedAdBottom = () => import(/* webpackChunkName: "gam-fixed-ad-bottom" */ './fixed-ad-bottom.vue');

export default (Browser) => {
  Browser.register('GAMFixedAdBottom', GAMFixedAdBottom);
};
