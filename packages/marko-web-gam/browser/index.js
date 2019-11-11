import GAMRefreshAd from './refresh-ad.vue';

const GAMFixedAdBottom = () => import(/* webpackChunkName: "gam-fixed-ad-bottom" */ './fixed-ad-bottom.vue');

export default (Browser) => {
  const { EventBus } = Browser;
  Browser.register('GAMRefreshAd', GAMRefreshAd, {
    provide: { EventBus },
  });
  Browser.register('GAMFixedAdBottom', GAMFixedAdBottom);
};
