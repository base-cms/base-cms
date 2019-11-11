const { isObject } = require('@base-cms/utils');

module.exports = (section) => {
  if (!isObject(section)) return '';
  const targeting = {
    ptype: 'section', // @todo Does this need to be 'category' for now?
    pterm: section.name,
    sterm: section.name,
    reg: 'anonymous', // @todo Get this from identity-x
  };
  return targeting;
};
