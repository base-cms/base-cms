const GAMConfiguration = require('@base-cms/marko-web-gam/config');

const config = new GAMConfiguration('3834', { basePath: 'iw.home' });

config
  .setTemplate('lb-top', {
    size: [[970, 250], [970, 90], [728, 90], [320, 50]],
    sizeMapping: [
      { viewport: [980, 0], size: [[970, 250], [970, 90], [728, 90]] },
      { viewport: [750, 0], size: [728, 90] },
      { viewport: [320, 0], size: [320, 50] },
    ],
    targeting: { pos: '728_1_a' },
  })
  .setTemplate('lb-flow', {
    size: [[728, 90], [320, 50], [300, 50], [300, 100]],
    sizeMapping: [
      { viewport: [980, 0], size: [728, 90] },
      { viewport: [750, 0], size: [728, 90] },
      { viewport: [320, 0], size: [[300, 50], [320, 50], [300, 100]] },
    ],
    targeting: { pos: '728_1_a' },
  })

  .setTemplate('lb-main', {
    size: [[970, 250], [970, 90], [728, 90], [320, 50]],
    sizeMapping: [
      { viewport: [980, 0], size: [[970, 250], [970, 90], [728, 90]] },
      { viewport: [750, 0], size: [728, 90] },
      { viewport: [320, 0], size: [320, 50] },
    ],
  })

  .setTemplate('lb-list', {
    size: [[728, 90], [320, 50]],
    sizeMapping: [
      { viewport: [980, 0], size: [728, 90] },
      { viewport: [750, 0], size: [728, 90] },
      { viewport: [320, 0], size: [320, 50] },
    ],
  })

  .setTemplate('mr', { size: [300, 250] })

  .setTemplate('sponsored-logo', { size: [[160, 65], [125, 125], [90, 90]], targeting: { pos: 'sponsoredlogo' } })

  .setTemplate('mr-rail', {
    size: [300, 250],
    targeting: { pos: '300_1_lft' },
  })
  .setTemplate('mr-flow', {
    size: [300, 250],
    targeting: { pos: '300_1_rht' },
  });

config
  .setAliasAdUnits('default', [
    { name: 'lb-top', templateName: 'lb-top', path: 'homepage' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'homepage' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'homepage' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'homepage' },

    { name: 'lb-section-page-main', templateName: 'lb-main', path: 'homepage' },
    { name: 'lb-content-page-main', templateName: 'lb-main', path: 'homepage' },
    { name: 'lb-section-page-list', templateName: 'lb-list', path: 'homepage' },
    { name: 'lb-content-page-list', templateName: 'lb-list', path: 'homepage' },
    { name: 'mr-section-page', templateName: 'mr', path: 'homepage' },
    { name: 'mr-content-page', templateName: 'mr', path: 'homepage' },
    { name: 'sponsored-logo-section-page', templateName: 'sponsored-logo', path: 'homepage' },
  ])
  .setAliasAdUnits('talent', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/talent' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/talent' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/talent' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/talent' },
    { name: 'lb-section-page-main', templateName: 'lb-main', path: 'categories/talent' },
    { name: 'lb-content-page-main', templateName: 'lb-main', path: 'article/talent' },
    { name: 'lb-section-page-list', templateName: 'lb-list', path: 'categories/talent' },
    { name: 'lb-content-page-list', templateName: 'lb-list', path: 'article/talent' },
    { name: 'mr-section-page', templateName: 'mr', path: 'categories/talent' },
    { name: 'mr-content-page', templateName: 'mr', path: 'article/talent' },
    { name: 'sponsored-logo-section-page', templateName: 'sponsored-logo', path: 'categories/talent' },
  ])
  .setAliasAdUnits('technology-and-iiot', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/technology_and_iiot' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/technology_and_iiot' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/technology_and_iiot' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/technology_and_iiot' },
    { name: 'lb-section-page-main', templateName: 'lb-main', path: 'categories/technology_and_iiot' },
    { name: 'lb-content-page-main', templateName: 'lb-main', path: 'article/technology_and_iiot' },
    { name: 'lb-section-page-list', templateName: 'lb-list', path: 'categories/technology_and_iiot' },
    { name: 'lb-content-page-list', templateName: 'lb-list', path: 'article/technology_and_iiot' },
    { name: 'mr-section-page', templateName: 'mr', path: 'categories/technology_and_iiot' },
    { name: 'mr-content-page', templateName: 'mr', path: 'article/technology_and_iiot' },
    { name: 'sponsored-logo-section-page', templateName: 'sponsored-logo', path: 'categories/technology_and_iiot' },
  ])
  .setAliasAdUnits('operations', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/operations' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/operations' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/operations' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/operations' },
    { name: 'lb-section-page-main', templateName: 'lb-main', path: 'categories/operations' },
    { name: 'lb-content-page-main', templateName: 'lb-main', path: 'article/operations' },
    { name: 'lb-section-page-list', templateName: 'lb-list', path: 'categories/operations' },
    { name: 'lb-content-page-list', templateName: 'lb-list', path: 'article/operations' },
    { name: 'mr-section-page', templateName: 'mr', path: 'categories/operations' },
    { name: 'mr-content-page', templateName: 'mr', path: 'article/operations' },
    { name: 'sponsored-logo-section-page', templateName: 'sponsored-logo', path: 'categories/operations' },
  ])
  .setAliasAdUnits('leadership', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/leadership' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/leadership' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/leadership' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/leadership' },
    { name: 'lb-section-page-main', templateName: 'lb-main', path: 'categories/leadership' },
    { name: 'lb-content-page-main', templateName: 'lb-main', path: 'article/leadership' },
    { name: 'lb-section-page-list', templateName: 'lb-list', path: 'categories/leadership' },
    { name: 'lb-content-page-list', templateName: 'lb-list', path: 'article/leadership' },
    { name: 'mr-section-page', templateName: 'mr', path: 'categories/leadership' },
    { name: 'mr-content-page', templateName: 'mr', path: 'article/leadership' },
    { name: 'sponsored-logo-section-page', templateName: 'sponsored-logo', path: 'categories/leadership' },
  ])
  .setAliasAdUnits('supply-chain', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/supply_chain' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/supply_chain' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/supply_chain' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/supply_chain' },
    { name: 'lb-section-page-main', templateName: 'lb-main', path: 'categories/supply_chain' },
    { name: 'lb-content-page-main', templateName: 'lb-main', path: 'article/supply_chain' },
    { name: 'lb-section-page-list', templateName: 'lb-list', path: 'categories/supply_chain' },
    { name: 'lb-content-page-list', templateName: 'lb-list', path: 'article/supply_chain' },
    { name: 'mr-section-page', templateName: 'mr', path: 'categories/supply_chain' },
    { name: 'mr-content-page', templateName: 'mr', path: 'article/supply_chain' },
    { name: 'sponsored-logo-section-page', templateName: 'sponsored-logo', path: 'categories/supply_chain' },
  ])
  .setAliasAdUnits('the-economy', [
    { name: 'lb-top', templateName: 'lb-top', path: 'categories/the_economy' },
    { name: 'lb-flow', templateName: 'lb-flow', path: 'categories/the_economy' },
    { name: 'mr-rail', templateName: 'mr-rail', path: 'categories/the_economy' },
    { name: 'mr-flow', templateName: 'mr-flow', path: 'categories/the_economy' },
    { name: 'lb-section-page-main', templateName: 'lb-main', path: 'categories/the_economy' },
    { name: 'lb-content-page-main', templateName: 'lb-main', path: 'article/the_economy' },
    { name: 'lb-section-page-list', templateName: 'lb-list', path: 'categories/the_economy' },
    { name: 'lb-content-page-list', templateName: 'lb-list', path: 'article/the_economy' },
    { name: 'mr-section-page', templateName: 'mr', path: 'categories/the_economy' },
    { name: 'mr-content-page', templateName: 'mr', path: 'article/the_economy' },
    { name: 'sponsored-logo-section-page', templateName: 'sponsored-logo', path: 'categories/the_economy' },
  ]);

module.exports = config;
