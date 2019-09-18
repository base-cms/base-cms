const BrowserComponent = require('../../components/browser-component');

module.exports = (tag, $global) => {
  const { config } = $global;
  const url = tag.id;
  const props = { mountPoint: config.oembedMountPoint(), url, attrs: tag.attrs };
  return BrowserComponent.renderToString({ $global, name: 'OEmbed', props });
};
