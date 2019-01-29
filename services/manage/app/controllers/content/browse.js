import Controller from '@ember/controller';

export default Controller.extend({
  /**
   * Query params
   */
  queryParams: null,
  'active-tab': null,
  attribution: 'updated',

  init() {
    this._super(...arguments);
    this.set('queryParams', [
      'active-tab',
      'attribution',
    ]);
    this.set('contentQueue', []);
  },

  actions: {
    queue(id, checked) {
      const queue = new Set(this.get('contentQueue'));
      if (checked) {
        queue.add(id);
      } else {
        queue.delete(id);
      }
      this.set('contentQueue', [...queue]);
    },

    clearQueue() {
      this.set('contentQueue', []);
    },
  },

});
