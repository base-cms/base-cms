const { get, getAsObject, getAsArray } = require('@base-cms/object-path');
const { asObject } = require('@base-cms/utils');

class ResolvedNode {
  constructor(data) {
    this.data = data;
  }

  get(path, def) {
    return get(this.data, path, def);
  }

  getAsObject(path) {
    return getAsObject(this.data, path);
  }

  getAsArray(path) {
    return getAsArray(this.data, path);
  }

  getEdgeNodesFor(path) {
    return this.getAsArray(`${path}.edges`).map(edge => asObject(edge).node);
  }
}

module.exports = ResolvedNode;
