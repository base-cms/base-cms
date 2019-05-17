const { get } = require('@base-cms/object-path');

class History {
  constructor(history) {
    this.history = history;
  }

  id() {
    const id = get(this.history, 'model.id');
    if (!id) throw new Error('No model id was provided on the history document.');
    return id;
  }

  modelName() {
    return `${this.namespace()}.${this.resource()}`;
  }

  namespace() {
    const parts = this.typeParts();
    return parts[0].toLowerCase();
  }

  resource() {
    const parts = this.typeParts();
    return parts[1];
  }

  type() {
    const type = get(this.history, 'model.type');
    if (!type) throw new Error('No model type was provided on the history document.');
    return type;
  }

  typeParts() {
    return this.type().split('\\');
  }

  wasChanged() {
    return this.event('changed');
  }

  wasCreated() {
    return this.event('created');
  }

  event(name) {
    return get(this.history, 'event') === name;
  }

  field(path, def) {
    return get(this.history, `fields.${path}`, def);
  }
}

module.exports = History;
