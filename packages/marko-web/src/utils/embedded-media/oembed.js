const BrowserComponent = require('../../components/browser/component');

module.exports = (tag, $global) => {
  const url = tag.id;
  const props = { url, attrs: tag.attrs };
  return BrowserComponent.renderToString({ $global, name: 'OEmbed', props });
};
