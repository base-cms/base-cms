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

const buildDefineSlot = ({
  id,
  path,
  size,
  oop,
} = {}) => {
  if (oop) return `googletag.defineOutOfPageSlot('${path}', '${id}')`;
  return `googletag.defineSlot('${path}', ${JSON.stringify(size)}, '${id}')`;
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
      oop,
      collapse,
      collapseBeforeAdFetch,
    }) => [
      buildDefineSlot({
        id,
        path,
        size,
        oop,
      }),
      buildTargeting(targeting),
      buildSizeMapping(sizeMapping),
      buildCollapse(collapse, collapseBeforeAdFetch),
      'addService(googletag.pubads());',
    ].filter(v => v).join('.'));
};
