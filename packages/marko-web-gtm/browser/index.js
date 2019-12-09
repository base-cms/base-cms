import GTMTrackInViewEvent from './track-in-view-event.vue';
import GTMTrackLoadMore from './track-load-more.vue';
import GTMTrackBusEvent from './track-bus-event.vue';

export default (Browser) => {
  const { EventBus } = Browser;
  Browser.register('GTMTrackInViewEvent', GTMTrackInViewEvent);
  Browser.register('GTMTrackLoadMore', GTMTrackLoadMore, {
    provide: { EventBus },
  });
  Browser.register('GTMTrackBusEvent', GTMTrackBusEvent, {
    provide: { EventBus },
  });
};
