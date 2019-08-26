const GAMConfiguration = require('@base-cms/marko-web-gam/config');

const config = new GAMConfiguration('21687441225', { basePath: 'Officer' });

config
  .setTemplate('BS', {
    size: [[970, 250], [970, 90], [728, 90], [320, 50], [300, 50], [300, 100]],
    sizeMapping: [
      { viewport: [980, 0], size: [[970, 250], [970, 90], [728, 90]] },
      { viewport: [750, 0], size: [728, 90] },
      { viewport: [320, 0], size: [[300, 50], [320, 50], [300, 100]] },
    ],
  })
  .setTemplate('MR', { size: [300, 250] })
  .setTemplate('HP', { size: [300, 600] })
  .setTemplate('MS', { size: [[300, 50], [320, 50]] });

config.setAliasAdUnits('default', [
  { name: 'BS', templateName: 'BS', path: 'Officer_BS' },
  { name: 'MR', templateName: 'MR', path: 'Officer_MR' },
  { name: 'HP', templateName: 'HP', path: 'Officer_HP' },
  { name: 'MS', templateName: 'MS', path: 'Officer_MS' },
]);

module.exports = config;
