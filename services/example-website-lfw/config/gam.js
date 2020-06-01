const configureGAM = require('@endeavor-business-media/package-shared/config/gam');

const config = configureGAM({ basePath: 'LFW' });

config
  .setAliasAdUnits('default', [
    { name: 'lb1', templateName: 'LB1', path: 'default/lb1' },
    { name: 'lb2', templateName: 'LB2', path: 'default/lb2' },
    { name: 'rail1', templateName: 'RAIL1', path: 'default/rail1' },
    { name: 'rail2', templateName: 'RAIL2', path: 'default/rail2' },
    { name: 'load-more', templateName: 'LM', path: 'default/load-more' },
    { name: 'reskin', path: 'default/reskin' },
    { name: 'wa', path: 'default/wa' },
  ])
  .setAliasAdUnits('covid-19', [
    { name: 'lb1', templateName: 'LB1', path: 'covid-19/lb1' },
    { name: 'lb2', templateName: 'LB2', path: 'covid-19/lb2' },
    { name: 'rail1', templateName: 'RAIL1', path: 'covid-19/rail1' },
    { name: 'rail2', templateName: 'RAIL2', path: 'covid-19/rail2' },
    { name: 'load-more', templateName: 'LM', path: 'covid-19/load-more' },
    { name: 'reskin', path: 'covid-19/reskin' },
  ])
  .setAliasAdUnits('detectors-imaging', [
    { name: 'lb1', templateName: 'LB1', path: 'detectors-imaging/lb1' },
    { name: 'lb2', templateName: 'LB2', path: 'detectors-imaging/lb2' },
    { name: 'rail1', templateName: 'RAIL1', path: 'detectors-imaging/rail1' },
    { name: 'rail2', templateName: 'RAIL2', path: 'detectors-imaging/rail2' },
    { name: 'load-more', templateName: 'LM', path: 'detectors-imaging/load-more' },
    { name: 'reskin', path: 'detectors-imaging/reskin' },
  ])
  .setAliasAdUnits('lasers-sources', [
    { name: 'lb1', templateName: 'LB1', path: 'lasers-sources/lb1' },
    { name: 'lb2', templateName: 'LB2', path: 'lasers-sources/lb2' },
    { name: 'rail1', templateName: 'RAIL1', path: 'lasers-sources/rail1' },
    { name: 'rail2', templateName: 'RAIL2', path: 'lasers-sources/rail2' },
    { name: 'load-more', templateName: 'LM', path: 'lasers-sources/load-more' },
    { name: 'reskin', path: 'lasers-sources/reskin' },
  ])
  .setAliasAdUnits('optics', [
    { name: 'lb1', templateName: 'LB1', path: 'optics/lb1' },
    { name: 'lb2', templateName: 'LB2', path: 'optics/lb2' },
    { name: 'rail1', templateName: 'RAIL1', path: 'optics/rail1' },
    { name: 'rail2', templateName: 'RAIL2', path: 'optics/rail2' },
    { name: 'load-more', templateName: 'LM', path: 'optics/load-more' },
    { name: 'reskin', path: 'optics/reskin' },
  ])
  .setAliasAdUnits('fiber-optics', [
    { name: 'lb1', templateName: 'LB1', path: 'fiber-optics/lb1' },
    { name: 'lb2', templateName: 'LB2', path: 'fiber-optics/lb2' },
    { name: 'rail1', templateName: 'RAIL1', path: 'fiber-optics/rail1' },
    { name: 'rail2', templateName: 'RAIL2', path: 'fiber-optics/rail2' },
    { name: 'load-more', templateName: 'LM', path: 'fiber-optics/load-more' },
    { name: 'reskin', path: 'fiber-optics/reskin' },
  ])
  .setAliasAdUnits('software-accessories', [
    { name: 'lb1', templateName: 'LB1', path: 'software-accessories/lb1' },
    { name: 'lb2', templateName: 'LB2', path: 'software-accessories/lb2' },
    { name: 'rail1', templateName: 'RAIL1', path: 'software-accessories/rail1' },
    { name: 'rail2', templateName: 'RAIL2', path: 'software-accessories/rail2' },
    { name: 'load-more', templateName: 'LM', path: 'software-accessories/load-more' },
    { name: 'reskin', path: 'software-accessories/reskin' },
  ])
  .setAliasAdUnits('test-measurement', [
    { name: 'lb1', templateName: 'LB1', path: 'test-measurement/lb1' },
    { name: 'lb2', templateName: 'LB2', path: 'test-measurement/lb2' },
    { name: 'rail1', templateName: 'RAIL1', path: 'test-measurement/rail1' },
    { name: 'rail2', templateName: 'RAIL2', path: 'test-measurement/rail2' },
    { name: 'load-more', templateName: 'LM', path: 'test-measurement/load-more' },
    { name: 'reskin', path: 'test-measurement/reskin' },
  ]);

module.exports = config;
