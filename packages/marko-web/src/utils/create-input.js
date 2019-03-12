const { get } = require('@base-cms/object-path');
const { linkClassNames } = require('@base-cms/web-common/utils');

const { buildForContent, buildForWebsiteSection } = linkClassNames;

module.exports = ({
  type,
  field,
  input,
}) => {
  const { from } = input;
  const obj = from ? get(input.obj, from, {}) : input.obj;

  const linkClass = [];
  switch (type) {
    case 'content':
      linkClass.push(...buildForContent(obj));
      break;
    case 'website-section':
      linkClass.push(...buildForWebsiteSection(obj));
      break;
    default:
      break;
  }
  if (input.linkClass) linkClass.push(input.linkClass);

  return {
    ...input,
    for: type,
    linkClass,
    obj,
    path: field,
  };
};
