import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);
    const types = ['keyup'];
    this.set('types', types);
    this.set('listeners', {});

    const { body } = document;
    const handler = this.handle.bind(this);

    types.forEach((type) => {
      body.addEventListener(type, handler);
    });

    this.set('onDestroy', () => {
      types.forEach((type) => {
        body.removeEventListener(type, handler);
      });
    });
  },

  addListener(type, fn) {
    const listeners = this.initListener(type);
    listeners.push(fn);
  },

  removeListener(type, fn) {
    const listeners = this.initListener(type);
    const index = listeners.indexOf(fn);
    if (index > -1) listeners.splice(index, 1);
  },

  initListener(type) {
    if (!this.get('types').includes(type)) throw new Error(`No global event listener available for type '${type}'`);
    const key = `listeners.${type}`;
    if (!this.get(key)) this.set(key, []);
    return this.get(key);
  },

  handle(event) {
    const { type } = event;
    const listeners = this.get(`listeners.${type}`) || [];
    listeners.map(fn => fn(event));
  },

  willDestroy() {
    this._super(...arguments);
    this.get('onDestroy')();
  },
});
