const GAMConfiguration = require('@base-cms/marko-web-gam/config');

const config = new GAMConfiguration('3834', { basePath: 'iw.home' });

config
  .setTemplate('lb-top', {
    size: [[970, 250], [970, 90], [970, 66], [728, 90], [320, 50], [300, 50], [300, 100]],
    sizeMapping: [
      { viewport: [980, 0], size: [[970, 250], [970, 90], [970, 66], [728, 90]] },
      { viewport: [750, 0], size: [728, 90] },
      { viewport: [320, 0], size: [[300, 50], [320, 50], [300, 100]] },
    ],
    targeting: { pos: '728_1_a' },
  })
  .setTemplate('lb-flow', {
    size: [[728, 90], [320, 50], [300, 50], [300, 100]],
    sizeMapping: [
      { viewport: [980, 0], size: [[970, 250], [970, 90], [970, 66], [728, 90]] },
      { viewport: [750, 0], size: [728, 90] },
      { viewport: [320, 0], size: [[300, 50], [320, 50], [300, 100]] },
    ],
    targeting: { pos: '728_1_a' },
  })
  .setTemplate('mr-rail', {
    size: [300, 250],
    targeting: { pos: '300_1_lft' },
  })
  .setTemplate('mr-flow', {
    size: [300, 250],
    targeting: { pos: '300_1_rht' },
  })
  .setTemplate('load-more', {
    size: [[300, 250], [300, 600]],
    targeting: { pos: '300_1_rht' },
  });

config
  .setAliasAdUnits('default', [
    { name: 'lb-top', templateName: 'lb-top', path: 'homepage' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'homepage' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'homepage' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'homepage' },
    { name: 'load-more', templateName: 'load-more', path: 'homepage' },
  ])
  .setAliasAdUnits('talent', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/talent' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/talent' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/talent' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/talent' },
    { name: 'load-more', templateName: 'load-more', path: 'categories/talent' },
  ])
  .setAliasAdUnits('technology-and-iiot', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/technology_and_iiot' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/technology_and_iiot' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/technology_and_iiot' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/technology_and_iiot' },
    { name: 'load-more', templateName: 'load-more', path: 'categories/technology_and_iiot' },
  ])
  .setAliasAdUnits('operations', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/operations' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/operations' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/operations' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/operations' },
    { name: 'load-more', templateName: 'load-more', path: 'categories/operations' },
  ])
  .setAliasAdUnits('leadership', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/leadership' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/leadership' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/leadership' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/leadership' },
    { name: 'load-more', templateName: 'load-more', path: 'categories/leadership' },
  ])
  .setAliasAdUnits('supply-chain', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/supply_chain' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/supply_chain' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/supply_chain' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/supply_chain' },
    { name: 'load-more', templateName: 'load-more', path: 'categories/supply_chain' },
  ])
  .setAliasAdUnits('the-economy', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/the_economy' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/the_economy' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/the_economy' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/the_economy' },
    { name: 'load-more', templateName: 'load-more', path: 'categories/the_economy' },
  ]);

module.exports = config;
