const { isObject } = require('@base-cms/utils');
const { get } = require('@base-cms/object-path');

module.exports = (content) => {
  if (!isObject(content)) return '';
  const targeting = {
    cont_id: content.id,
    cont_type: content.type,
    ptype: content.type,
    pterm: get(content, 'primarySection.name'),
    sterm: get(content, 'primarySection.name'),
    // author: '', // @todo Determine if this is needed, how to handle multiple/zero authors
    reg: 'anonymous', // @todo Get this from identity-x
  };
  return targeting;
};
