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
  },

});
