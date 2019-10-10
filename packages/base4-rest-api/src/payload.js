const { set } = require('@base-cms/object-path');

const { isArray } = Array;

class Base4RestPayload {
  constructor({ type }) {
    if (!type) throw new Error('A model type is required to create a REST payload.');
    this.data = { type };
  }

  obj() {
    return { data: this.data };
  }

  set(path, value) {
    let v = value;
    if (v instanceof Date) v = v.toISOString();
    if (path === 'id') v = `${v}`;
    if (path) set(this.data, path, v);
    return this;
  }

  setLink(field, { id, type } = {}) {
    Base4RestPayload.validateLink(id, type);
    if (field) this.set(`links.${field}.linkage`, { id: `${id}`, type });
    return this;
  }

  setLinks(field, links) {
    if (isArray(links)) {
      links.forEach(({ id, type } = {}) => Base4RestPayload.validateLink(id, type));
      if (field) this.set(`links.${field}.linkage`, links.map(({ id, type }) => ({ id: `${id}`, type })));
    }
    return this;
  }

  static validateLink(id, type) {
    if (!type || !id) throw new Error('An id and type are required to create a REST payload link.');
    return true;
  }
}

module.exports = Base4RestPayload;
