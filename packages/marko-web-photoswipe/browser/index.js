const PhotoSwipe = () => import(/* webpackChunkName: "marko-web-photoswipe" */ './index.vue');

export default (Browser) => {
  Browser.register('PhotoSwipe', PhotoSwipe);
};
