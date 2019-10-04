const NativeXConfiguration = require('@base-cms/marko-web-native-x/config');

const config = new NativeXConfiguration('https://ebm.native-x.io');

config
  .setAliasPlacements('default', [
    { name: 'card', id: '5cdb230339937800010ea6ca' },
    { name: 'list2', id: '5cdb2308f41dfb0001fce77f' },
    { name: 'list1', id: '5cdb230ef41dfb0001fce866' },
  ])
  .setAliasPlacements('optics', [
    { name: 'card', id: '5cdb234939937800010eb292' },
    { name: 'list2', id: '5cdb234ff41dfb0001fcf381' },
    { name: 'list1', id: '5cdb235639937800010eb470' },
  ])
  .setAliasPlacements('lasers-sources', [
    { name: 'card', id: '5cdb2332f41dfb0001fceed9' },
    { name: 'list2', id: '5cdb233839937800010eb001' },
    { name: 'list1', id: '5cdb233f39937800010eb0eb' },
  ])
  .setAliasPlacements('detectors-imaging', [
    { name: 'card', id: '5cdb231839937800010eaa5d' },
    { name: 'list2', id: '5cdb231ef41dfb0001fcec01' },
    { name: 'list1', id: '5cdb232639937800010ead76' },
  ])
  .setAliasPlacements('test-measurement', [
    { name: 'card', id: '5cdb2388f41dfb0001fcfb50' },
    { name: 'list2', id: '5cdb238f39937800010ebcb9' },
    { name: 'list1', id: '5cdb239539937800010ebd85' },
  ])
  .setAliasPlacements('software-accessories', [
    { name: 'card', id: '5cdb237339937800010eb873' },
    { name: 'list2', id: '5cdb2379f41dfb0001fcf91f' },
    { name: 'list1', id: '5cdb237f39937800010eba5b' },
  ])
  .setAliasPlacements('fiber-optics', [
    { name: 'card', id: '5cdb235d39937800010eb580' },
    { name: 'list2', id: '5cdb236339937800010eb685' },
    { name: 'list1', id: '5cdb2369f41dfb0001fcf737' },
  ]);

module.exports = config;
