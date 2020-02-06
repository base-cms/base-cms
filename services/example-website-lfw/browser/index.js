import Browser from '@base-cms/marko-web/browser';
import DefaultTheme from '@base-cms/marko-web-theme-default/browser';
import GTM from '@base-cms/marko-web-gtm/browser';
import GAM from '@base-cms/marko-web-gam/browser';
import GCSE from '@base-cms/marko-web-gcse/browser';
import RevealAd from '@base-cms/marko-web-reveal-ad/browser';
import SocialSharing from '@base-cms/marko-web-social-sharing/browser';
import PhotoSwipe from '@base-cms/marko-web-photoswipe/browser';
import Leaders from '@base-cms/marko-web-leaders/browser';

DefaultTheme(Browser);
GTM(Browser);
GAM(Browser);
GCSE(Browser);
RevealAd(Browser);
SocialSharing(Browser);
PhotoSwipe(Browser);
Leaders(Browser);

export default Browser;
