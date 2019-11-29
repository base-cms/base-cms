const { isObject } = require('@base-cms/utils');
const defaultValue = require('@base-cms/marko-core/utils/default-value');
const buildTargeting = require('./build-targeting');
const buildSizeMapping = require('./build-size-mapping');

const { isArray } = Array;

const buildCollapse = (collapse, collapseBeforeAdFetch) => {
  const args = [defaultValue(collapse, true) ? 'true' : 'false'];
  if (collapseBeforeAdFetch === true) args.push('true');
  if (collapseBeforeAdFetch === false) args.push('false');
  return `setCollapseEmptyDiv(${args.join(', ')})`;
};

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
      collapse,
      collapseBeforeAdFetch,
    }) => [
      `googletag.defineSlot('${path}', ${JSON.stringify(size)}, '${id}')`,
      buildTargeting(targeting),
      buildSizeMapping(sizeMapping),
      buildCollapse(collapse, collapseBeforeAdFetch),
      'addService(googletag.pubads());',
    ].filter(v => v).join('.'));
};
