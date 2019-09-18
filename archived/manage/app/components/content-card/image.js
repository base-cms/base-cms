import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  src: null,
  alt: null,
  title: null,
  isLogo: false,

  init() {
    this._super(...arguments);
    if (!this.get('focalpoint')) {
      this.set('focalpoint', { x: 0.5, y: 0.5 });
    }
  },
});
