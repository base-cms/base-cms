const { isObject } = require('@base-cms/utils');
const buildSlotTargeting = require('./build-slot-targeting');
const buildSizeMapping = require('./build-size-mapping');

const { isArray } = Array;

module.exports = (slots) => {
  if (!isObject(slots)) return [];
  return Object.keys(slots)
    .map(id => ({ ...slots[id], id }))
    .filter(slot => slot.path && isArray(slot.size))
    .map(({
      id,
      path,
      size,
      sizeMapping,
      targeting,
    }) => {
      const chain = [
        `googletag.defineSlot('${path}', ${JSON.stringify(size)}, '${id}')`,
        buildSlotTargeting(targeting),
        buildSizeMapping(sizeMapping),
        'addService(googletag.pubads());',
      ];
      return chain.filter(o => (o)).join('.');
    });
};
