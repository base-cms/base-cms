const { isObject } = require('@base-cms/common');

const { isArray } = Array;

const getFields = (schema, type, selectionSet, fields = []) => {
  if (!isObject(selectionSet)) return fields;
  const { selections = [] } = selectionSet;
  selections.forEach((s) => {
    const { kind, name, typeCondition } = s;
    switch (kind) {
      case 'Field':
        fields.push({ type, value: name.value });
        break;
      case 'InlineFragment':
        getFields(schema, schema.getType(typeCondition.name.value), s.selectionSet, fields);
        break;
      default:
        break;
    }
  });
  return fields;
};

module.exports = (schema, returnType, selectionSet) => {
  const type = returnType.ofType || returnType;
  // An array of { type, value } objects.
  const selected = getFields(schema, type, selectionSet);
  const { requiresProject } = type;
  const fields = isArray(requiresProject)
    ? selected.concat(requiresProject.map(value => ({ type, value })))
    : selected;
  return fields.reduce((o, field) => {
    const map = field.type.getFields();
    if (!map[field.value]) return o;
    return ({ ...o, ...map[field.value].projection || {} });
  }, {});
};
