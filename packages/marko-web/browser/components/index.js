import LoadMoreTrigger from './load-more-trigger.vue';
import TriggerInViewEvent from './trigger-in-view-event.vue';

const OEmbed = () => import(/* webpackChunkName: "oembed" */ './oembed.vue');
const FormDotComGatedDownload = () => import(/* webpackChunkName: "form-dot-com" */ './gated-download/form-dot-com.vue');
const WufooGatedDownload = () => import(/* webpackChunkName: "wufoo-gated-download" */ './gated-download/wufoo.vue');

export default (Browser) => {
  Browser.register('LoadMoreTrigger', LoadMoreTrigger);
  Browser.register('TriggerInViewEvent', TriggerInViewEvent);
  Browser.register('OEmbed', OEmbed);
  Browser.register('FormDotComGatedDownload', FormDotComGatedDownload);
  Browser.register('WufooGatedDownload', WufooGatedDownload);
};
