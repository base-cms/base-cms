import LoadMoreTrigger from './load-more-trigger.vue';
import TriggerInViewEvent from './trigger-in-view-event.vue';

const components = {
  LoadMoreTrigger, // usage _very_ frequent, do not dynamically import.
  OEmbed: () => import(/* webpackChunkName: "oembed" */ './oembed.vue'),
  TriggerInViewEvent, // usage _very_ frequent, do not dynamically import.
  FormDotComGatedDownload: () => import(/* webpackChunkName: "form-dot-com" */ './gated-download/form-dot-com.vue'),
  WufooGatedDownload: () => import(/* webpackChunkName: "wufoo-gated-download" */ './gated-download/wufoo.vue'),
};

export default components;
