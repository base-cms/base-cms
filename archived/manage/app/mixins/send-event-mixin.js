import Mixin from '@ember/object/mixin';

export default Mixin.create({
  sendEvent(name, ...args) {
    const fn = this.get(name);
    if (typeof fn === 'function') fn(...args);
  },
});
