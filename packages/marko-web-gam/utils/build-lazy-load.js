/**
 * @see https://developers.google.com/doubleclick-gpt/samples/lazy-loading
 * @see https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_enableLazyLoad
 */
module.exports = ({
  enabled = false,
  fetchMarginPercent = 0,
  renderMarginPercent = 0,
  mobileScaling = 1,
} = {}) => {
  if (!enabled) return '';
  const opts = { fetchMarginPercent, renderMarginPercent, mobileScaling };
  const optStr = Object.keys(opts).map(prop => `${prop}: ${opts[prop]}`).join(', ');
  return `googletag.pubads().enableLazyLoad({ ${optStr} });`;
};
