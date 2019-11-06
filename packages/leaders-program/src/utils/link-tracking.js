const canSendBeacon = () => window.navigator && typeof window.navigator.sendBeacon === 'function';

const willClickUnloadPage = target => Boolean(target !== '_blank');

const shouldAwait = target => willClickUnloadPage(target) && canSendBeacon();

const buildFlags = target => ({
  canSendBeacon: canSendBeacon(),
  willClickUnloadPage: willClickUnloadPage(),
  shouldAwait: shouldAwait(target),
});

export {
  canSendBeacon,
  willClickUnloadPage,
  shouldAwait,
  buildFlags,
};
