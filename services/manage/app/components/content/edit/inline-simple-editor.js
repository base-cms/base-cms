import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
    this.set('toolbarButtons', ['bold', 'italic', 'underline', 'strikeThrough']);
  },
});
