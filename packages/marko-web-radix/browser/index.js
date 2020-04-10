const IdentityDetector = () => import(/* webpackChunkName: "marko-web-radix-identity-detector" */ './identity-detector.vue');
const InquiryListener = () => import(/* webpackChunkName: "marko-web-radix-inquiry-listener" */ './inquiry-listener.vue');

export default (Browser) => {
  const { EventBus } = Browser;
  Browser.register('RadixIdentityDetector', IdentityDetector, {
    provide: { EventBus },
  });
  Browser.register('RadixInquiryListener', InquiryListener, {
    provide: { EventBus },
  });
};
