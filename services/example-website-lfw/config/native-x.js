const configureNativeX = require('@endeavor-business-media/package-shared/config/native-x');

const config = configureNativeX();

config
  .setAliasPlacements('default', [
    { name: 'default', id: '5cdb230339937800010ea6ca' },
  ])
  .setAliasPlacements('optics', [
    { name: 'default', id: '5cdb234939937800010eb292' },
  ])
  .setAliasPlacements('lasers-sources', [
    { name: 'default', id: '5cdb2332f41dfb0001fceed9' },
  ])
  .setAliasPlacements('detectors-imaging', [
    { name: 'default', id: '5cdb231839937800010eaa5d' },
  ])
  .setAliasPlacements('test-measurement', [
    { name: 'default', id: '5cdb2388f41dfb0001fcfb50' },
  ])
  .setAliasPlacements('software-accessories', [
    { name: 'default', id: '5cdb237339937800010eb873' },
  ])
  .setAliasPlacements('fiber-optics', [
    { name: 'default', id: '5cdb235d39937800010eb580' },
  ]);

module.exports = config;
