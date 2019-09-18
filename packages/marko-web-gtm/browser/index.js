import GTMTrackInViewEvent from './track-in-view-event.vue';
import GTMTrackLoadMore from './track-load-more.vue';

export default (Browser) => {
  const { EventBus } = Browser;
  Browser.registerComponent('GTMTrackInViewEvent', GTMTrackInViewEvent);
  Browser.registerComponent('GTMTrackLoadMore', GTMTrackLoadMore, { EventBus });
};
