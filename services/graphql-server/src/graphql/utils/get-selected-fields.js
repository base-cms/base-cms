const { isObject } = require('@base-cms/common');

module.exports = (selectionSet) => {
  if (!isObject(selectionSet)) return [];
  const { selections = [] } = selectionSet;
  return selections.map(s => s.name.value);
};
