import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['dropdown'],

  count: 0,

  isDisabled: computed('count', function() {
    return this.get('count') < 1;
  }),
});