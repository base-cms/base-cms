const { isObject } = require('@base-cms/utils');

module.exports = (content) => {
  if (!isObject(content)) return '';
  const targeting = {
    cont_id: content.id,
    cont_type: content.type,
    ptype: content.type,
    pterm: content.primarySection.name,
    sterm: content.primarySection.name,
    // author: '', // @todo Determine if this is needed, how to handle multiple/zero authors
    reg: 'anonymous', // @todo Get this from identity-x
  };
  return targeting;
};
