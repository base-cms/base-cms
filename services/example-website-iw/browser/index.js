import Browser from '@base-cms/marko-web/browser';
import DefaultTheme from '@base-cms/marko-web-theme-default/browser';
import GTM from '@base-cms/marko-web-gtm/browser';
import GAM from '@base-cms/marko-web-gam/browser';
import RevealAd from '@base-cms/marko-web-reveal-ad/browser';

import IncrementAdPos from './increment-ad-pos.vue';

DefaultTheme(Browser);
GTM(Browser);
GAM(Browser);
RevealAd(Browser);

const { EventBus } = Browser;

Browser.register('LazarusIncrementAdPos', IncrementAdPos, {
  provide: { EventBus },
});

export default Browser;
