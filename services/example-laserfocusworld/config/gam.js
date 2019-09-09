const GAMConfiguration = require('@base-cms/marko-web-gam/config');

const config = new GAMConfiguration('21687441225', { basePath: 'LFW' });

config
  .setTemplate('LB', {
    size: [[970, 250], [970, 90], [970, 66], [728, 90], [320, 50], [300, 50], [300, 100]],
    sizeMapping: [
      { viewport: [980, 0], size: [[970, 250], [970, 90], [970, 66], [728, 90]] },
      { viewport: [750, 0], size: [728, 90] },
      { viewport: [320, 0], size: [[300, 50], [320, 50], [300, 100]] },
    ],
  })
  .setTemplate('CONTENT', { size: [[300, 250], [300, 600]] });

config
  .setAliasAdUnits('default', [
    { name: 'lb1', templateName: 'LB', path: 'default/lb1' },
    { name: 'lb2', templateName: 'LB', path: 'default/lb2' },
    { name: 'rail1', templateName: 'CONTENT', path: 'default/rail1' },
    { name: 'rail2', templateName: 'CONTENT', path: 'default/rail2' },
    { name: 'load-more', templateName: 'CONTENT', path: 'default/load-more' },
    { name: 'reskin', path: 'default/reskin' },
    { name: 'wa', path: 'default/wa' },
  ])
  .setAliasAdUnits('detectors-imaging', [
    { name: 'lb1', templateName: 'LB', path: 'detectors-imaging/lb1' },
    { name: 'lb2', templateName: 'LB', path: 'detectors-imaging/lb2' },
    { name: 'rail1', templateName: 'CONTENT', path: 'detectors-imaging/rail1' },
    { name: 'rail2', templateName: 'CONTENT', path: 'detectors-imaging/rail2' },
    { name: 'load-more', templateName: 'CONTENT', path: 'detectors-imaging/load-more' },
    { name: 'reskin', path: 'detectors-imaging/reskin' },
  ])
  .setAliasAdUnits('lasers-sources', [
    { name: 'lb1', templateName: 'LB', path: 'lasers-sources/lb1' },
    { name: 'lb2', templateName: 'LB', path: 'lasers-sources/lb2' },
    { name: 'rail1', templateName: 'CONTENT', path: 'lasers-sources/rail1' },
    { name: 'rail2', templateName: 'CONTENT', path: 'lasers-sources/rail2' },
    { name: 'load-more', templateName: 'CONTENT', path: 'lasers-sources/load-more' },
    { name: 'reskin', path: 'lasers-sources/reskin' },
  ])
  .setAliasAdUnits('optics', [
    { name: 'lb1', templateName: 'LB', path: 'optics/lb1' },
    { name: 'lb2', templateName: 'LB', path: 'optics/lb2' },
    { name: 'rail1', templateName: 'CONTENT', path: 'optics/rail1' },
    { name: 'rail2', templateName: 'CONTENT', path: 'optics/rail2' },
    { name: 'load-more', templateName: 'CONTENT', path: 'optics/load-more' },
    { name: 'reskin', path: 'optics/reskin' },
  ])
  .setAliasAdUnits('fiber-optics', [
    { name: 'lb1', templateName: 'LB', path: 'fiber-optics/lb1' },
    { name: 'lb2', templateName: 'LB', path: 'fiber-optics/lb2' },
    { name: 'rail1', templateName: 'CONTENT', path: 'fiber-optics/rail1' },
    { name: 'rail2', templateName: 'CONTENT', path: 'fiber-optics/rail2' },
    { name: 'load-more', templateName: 'CONTENT', path: 'fiber-optics/load-more' },
    { name: 'reskin', path: 'fiber-optics/reskin' },
  ])
  .setAliasAdUnits('software-accessories', [
    { name: 'lb1', templateName: 'LB', path: 'software-accessories/lb1' },
    { name: 'lb2', templateName: 'LB', path: 'software-accessories/lb2' },
    { name: 'rail1', templateName: 'CONTENT', path: 'software-accessories/rail1' },
    { name: 'rail2', templateName: 'CONTENT', path: 'software-accessories/rail2' },
    { name: 'load-more', templateName: 'CONTENT', path: 'software-accessories/load-more' },
    { name: 'reskin', path: 'software-accessories/reskin' },
  ])
  .setAliasAdUnits('test-measurement', [
    { name: 'lb1', templateName: 'LB', path: 'test-measurement/lb1' },
    { name: 'lb2', templateName: 'LB', path: 'test-measurement/lb2' },
    { name: 'rail1', templateName: 'CONTENT', path: 'test-measurement/rail1' },
    { name: 'rail2', templateName: 'CONTENT', path: 'test-measurement/rail2' },
    { name: 'load-more', templateName: 'CONTENT', path: 'test-measurement/load-more' },
    { name: 'reskin', path: 'test-measurement/reskin' },
  ]);

module.exports = config;
