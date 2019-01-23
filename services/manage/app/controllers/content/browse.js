import Controller from '@ember/controller';

export default Controller.extend({
  /**
   * Query params
   */
  queryParams: null,
  attribution: 'updated',

  init() {
    this._super(...arguments);
    this.set('queryParams', [
      'attribution',
    ]);
    this.set('contentQueue', new Set());
  },

  actions: {
    queue(id, checked) {
      const queue = this.get('contentQueue');
      if (checked) {
        queue.add(id);
      } else {
        queue.delete(id);
      }
    },
  },

});
