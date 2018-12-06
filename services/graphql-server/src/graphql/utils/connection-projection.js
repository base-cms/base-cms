const objectPath = require('object-path');
const getProjection = require('./get-projection');
const getSelected = require('./get-selected-fields');

module.exports = ({ returnType, fieldNodes, schema }) => {
  let projection;
  const { projectUsing } = returnType.ofType || returnType;
  if (projectUsing) {
    const edges = objectPath.get(fieldNodes[0], 'selectionSet.selections', []).find(s => s.name.value === 'edges');
    const node = objectPath.get(edges, 'selectionSet.selections', []).find(s => s.name.value === 'node');
    if (node) {
      // Project based on the node's selectionSet
      projection = getProjection(
        schema.getType(projectUsing).getFields(),
        getSelected(node.selectionSet),
      );
    } else {
      // Do not return any fields, since `node` was not selected.
      projection = {};
    }
  }
  return projection;
};
