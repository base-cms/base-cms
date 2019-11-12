import Browser from '@base-cms/marko-web/browser';
import DefaultTheme from '@base-cms/marko-web-theme-default/browser';
import GTM from '@base-cms/marko-web-gtm/browser';
import GAM from '@base-cms/marko-web-gam/browser';
import Leaders from '@base-cms/marko-web-leaders/browser';

Leaders(Browser);
DefaultTheme(Browser);
GTM(Browser);
GAM(Browser);

export default Browser;
